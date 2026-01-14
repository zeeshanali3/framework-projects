const logMessage = require("./Services/SysFunctions/LogFunctions/consoleLog.js");
const express = require('express');
const { requireAllJSFiles } = require('./Services/SysScripts/ServerScripts/requiringScript.js');
const applyMiddleware = require('./Src/Config/Security/securityConfig.js');
const apiRoutes = require('./dynamicRoutes.js');
const path = require('path');
const multer = require('multer')
const http = require('http');
// const SocketManager = require('./Services/Integrations/WebSocket/socketManager.js');
const { initializeSocketDelegates } = require('./Src/Sockets/RegisterDelegates.js');
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const {
  paginateListBuckets,
  S3Client,
  S3ServiceException,
  PutObjectCommand
} = require("@aws-sdk/client-s3");
const {
  getSignedUrl,
  S3RequestPresigner,
} = require("@aws-sdk/s3-request-presigner");
const fs = require('fs');
const { validateFileToken } = require('./Services/Integrations/FileHandling/validateFileToken.js');
const sendResponse = require('./Services/SysFunctions/LogFunctions/consoleLog.js');
const {projectDB} = require('./Services/Integrations/Database/projectDb.js');
const { executeQuery } = require('./Services/Integrations/Database/queryExecution.js');
const AutoRenewalCron = require('./Services/Integrations/CronJobs/autoRenewalCron.js');

require('dotenv').config();
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });


const app = express();



async function initializeAutoRenewal() {
  try {
    logMessage(['Initializing auto-renewal system']);
    
    const autoRenewalCron = new AutoRenewalCron();
    autoRenewalCron.start();
    
    logMessage(['Auto-renewal system initialized successfully']);
    
    // Store reference for potential cleanup
    global.autoRenewalCron = autoRenewalCron;
    
  } catch (error) {
    console.error('Failed to initialize auto-renewal system:', error);
  }
}

async function initializeApp() {
  try {
    const baseDirObjects = path.join(__dirname, '/Src/Apis');
    if (!fs.existsSync(baseDirObjects)) {
      fs.mkdirSync(baseDirObjects, { recursive: true });
    }

    applyMiddleware(app);
    requireAllJSFiles(baseDirObjects);

    const port = process.env.SERVER_PORT || 3000;

    
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, 'Uploads');
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
      }
    });
    const upload = multer({ storage });

    app.post('/upload', validateFileToken, upload.single('file'), async (req, res) => {
      if (!req.file) {
        sendResponse(res, 400, 'No File Uploaded');
        return;
      }
    
      const { originalname, mimetype, size, path: filePath } = req.file;
      const attachmentId = req.attachmentId;
    
      if (!attachmentId) {
         sendResponse(res, 400, 'Missing attachment ID');
         return;
      }
    
      const fileExtension = path.extname(originalname);
      const timestamp = Date.now();
      const newFileName = `${attachmentId}-${timestamp}${fileExtension}`;
      const connection = await projectDB();
      connection.connect((dbErr) => {
          if (dbErr) {
            sendResponse(res, 500, 'Database Connection Error');
            return;
          }
    
          const updateSql = `UPDATE attachments 
                             SET attachment_name = ?, 
                                 attachment_type = ?, 
                                 attachment_size = ?, 
                                 attachment_link = ?
                             WHERE attachment_id = ?`;
          const values = [newFileName, mimetype, size, filePath, attachmentId];
    
          connection.query(updateSql, values, (updateErr, updateResults) => {
              connection.release();
              if (updateErr) {
                sendResponse(res, 400, 'Failed To Upload Attachment Metadata');
                return;
              }
              sendResponse(res, 200, 'File uploaded and metadata updated successfully', {fileName: newFileName, attachment_id: attachmentId } )
          });
      });
    });

    app.use('', apiRoutes());

    global.server = http.createServer(app);

    // const socketManager = new SocketManager(server);
    // Sockets ko initialize karen
    global.socketComponents = initializeSocketDelegates();

    server.listen(port, () => {
      logMessage([`Server is running on port ${port}`]);
      //initializeAutoRenewal();
    });
  } catch (error) {
    console.error('Error during initialization:', error);
    process.exit(1); 
  }
}

process.on('uncaughtException', async (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});

initializeApp();
