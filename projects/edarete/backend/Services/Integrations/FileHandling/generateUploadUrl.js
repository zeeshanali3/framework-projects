const logMessage = require("../../SysFunctions/LogFunctions/consoleLog.js");
const {projectDB} = require("../Database/projectDb");
const { executeQuery } = require("../Database/queryExecution");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "FILESECRET";

async function getFileUploadUrl_local(protocol, host, fileType) {
    const connection = await projectDB();
    const sql = "INSERT INTO attachments (status) VALUES ('pending')";
    const results = await executeQuery(sql, [], connection);
    
    logMessage(["GENERATEUPLOAD URL.js || Results: ", results])
    if (!results || !results.insertId) {
        throw new Error('Failed to insert attachment record');
    }

    const attachmentId = results.insertId;
    const payload = { attachmentId };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    const uploadUrl = `${protocol}://${host}/upload?token=${token}`;
    return {uploadUrl, token};
}

async function getFileUploadUrl_s3(protocol, host, fileType, bucket) {
    let connection = await projectDB();
    const insertQuery = "INSERT INTO attachments (status) VALUES ('pending')";
    const results = await executeQuery(insertQuery, [], connection);
    
    if (!results || !results.insertId) {
        throw new Error('Failed to insert attachment record');
    }

    const attachmentId = results.insertId;
    const timestamp = Date.now();
    const s3Key = `uploads/${attachmentId}-${timestamp}.${fileType}`;
    logMessage(["S3KEY: ", s3Key]);
    // Update DB with generated S3 key
    connection = await projectDB();
    const updateQuery = "UPDATE attachments SET attachment_link = ? WHERE attachment_id = ?";
    await executeQuery(updateQuery, [s3Key, attachmentId], connection);
    let region = process.env.S3_REGION
    let credentials=  {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    }
    logMessage([region]);
    logMessage([credentials]);
    const client = new S3Client({
        region: process.env.S3_REGION,
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
        forcePathStyle: true,
        signatureVersion: 'v4'
    });


    try {
        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: s3Key
        });
        const uploadUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
        const token = jwt.sign({ attachmentId }, SECRET_KEY, { expiresIn: '1h' });
        return { uploadUrl, token };
    } catch (s3Error) {
        throw new Error('Error generating presigned URL');
    }
}

async function generateUploadUrl(req, bucket,  storage = "local") {
    let fileFunc;
    let fileType = req.query.fileType || 'png';
    if (storage == 'local') {
        fileFunc = getFileUploadUrl_local;
    } else if (storage == 'S3') {
        fileFunc = getFileUploadUrl_s3
    }
    else {
        throw new Error("Invalid Storage Type!");
    }

    const upload = await fileFunc(req.protocol, req.get('host'), fileType, bucket);
    return upload;
}

module.exports = { generateUploadUrl };
