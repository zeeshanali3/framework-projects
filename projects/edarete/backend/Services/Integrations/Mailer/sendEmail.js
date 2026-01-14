require('dotenv').config();
const nodemailer = require('nodemailer');
const { securityDB } = require('../Database/securityDB');
const { executeQuery } = require('../Database/queryExecution');
const logMessage = require('../../SysFunctions/LogFunctions/consoleLog');

async function handleSendEmail(userEmail, subject, msg) {
    let connection;

    try {
        // Create the email transport
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Construct the email options
        const mailOptions = {
            from: 'Edarete <scholarspace112@gmail.com>',
            to: userEmail,
            subject: subject || 'Notification',
            html: `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f9f9f9;
                                color: #333;
                                margin: 0;
                                padding: 0;
                            }
                            .container {
                                padding: 20px;
                                background-color: #ffffff;
                                border: 1px solid #ddd;
                                border-radius: 8px;
                                max-width: 600px;
                                margin: 30px auto;
                                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                            }
                            h2 {
                                color: #007bff;
                                margin-bottom: 20px;
                            }
                            p {
                                line-height: 1.6;
                                margin-bottom: 15px;
                            }
                            .footer {
                                font-size: 12px;
                                color: #888;
                                margin-top: 20px;
                                text-align: center;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h2>${subject}</h2>
                            <p>${msg}</p>
                            <p>Thank you for using our service!</p>
                            <div class="footer">
                                <p>Edarete • All Rights Reserved</p>
                            </div>
                        </div>
                    </body>
                </html>
            `
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        logMessage(`Email sent: ${info.response}`);

        // Log email to the database
        connection = await securityDB();
        const logQuery = `
            INSERT INTO email_log (recipient_email, subject, content)
            VALUES (?, ?, ?)
        `;
        const logValues = [userEmail, subject, msg];
        await executeQuery(logQuery, logValues, connection);

    } catch (error) {
        console.error('Error occurred while sending or logging email:', error);
    } 
}

module.exports = handleSendEmail;
