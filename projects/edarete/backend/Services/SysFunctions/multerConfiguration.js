const multer = require('multer');
const path = require('path');
const fs = require('fs').promises; // ✅ use the promise-based fs API

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, 'Uploads');
    fs.mkdir(uploadsDir, { recursive: true })
      .then(() => cb(null, uploadsDir))   // ✅ Non-blocking, handled properly
      .catch(err => cb(err));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(xlsx|xls)$/)) {
      return cb(new Error('Please upload an Excel file'), false);
    }
    cb(null, true);
  }
});

module.exports = upload;
