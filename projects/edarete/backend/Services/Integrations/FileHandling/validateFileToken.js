const {projectDB} = require("../Database/projectDb");
const { executeQuery } = require("../Database/queryExecution");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "FILESECRET";

async function validateFileToken(req,res, next) {
    const token = req.query.token;
    if (!token) {
        throw new Error('No token provided');
    }
    const decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) reject(new Error('Invalid or expired token'));
            else resolve(decoded);
        });
    });

    const connection = await projectDB();
    const { attachmentId } = decoded;
    const sql = `SELECT status FROM attachments WHERE attachment_id = ?`;
    const results = await executeQuery(sql, [attachmentId], connection);

    if (!results.length || results[0].status === 'uploaded') {
        throw new Error('File has already been uploaded with this token');
    }

    req.attachmentId = attachmentId;
    next();
}

module.exports = { validateFileToken };