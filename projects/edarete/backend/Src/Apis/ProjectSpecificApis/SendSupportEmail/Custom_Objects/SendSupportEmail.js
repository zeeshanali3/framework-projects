const projectDB = require("../../../../../Services/Integrations/Database/projectDb");
const { executeQuery } = require("../../../../../Services/Integrations/Database/queryExecution");
const db = require("../../../../../Services/Integrations/Database/databaseAbstraction.js");
// const sendEmail = require('../../../../Constants/sendEmailOTP.js');
const nodemailer = require('nodemailer');
const logMessage = require('../../../../../Services/SysFunctions/LogFunctions/consoleLog')


async function SendSupportEmail(req, decryptedPayload) {    

    
    const objectResolverOutput = decryptedPayload["objectResolverOutput"]; 
    let {name, email, rollNumber, description} = req.body;
    logMessage([name, email, rollNumber, description]);

    try {
        // Create the email transport
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let mailOptions = {
            from: 'Edarete <scholarspace112@gmail.com>',
            to: `afaq.khawar@granjur.com`,
            subject: 'Support Message',
            html: `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                color: #333;
                            }
                            .container {
                                padding: 20px;
                                border: 1px solid #ccc;
                                border-radius: 5px;
                                background-color: #fff;
                                max-width: 500px;
                                margin: 0 auto;
                            }
                            .otp {
                                font-size: 24px;
                                color: #007bff;
                                font-weight: bold;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <p>Dear Admin,</p>
                            <p>You have recieved a support message</p>
                            <p> Name: ${name}</p>
                            <p> Email: ${email}</p>
                            <p> Roll No: ${rollNumber}</p>
                            <p> Message: ${description}</p>
                        </div>
                    </body>
                </html>
            `
        };

        // Send email
        let info = await transporter.sendMail(mailOptions);
        logMessage(mailOptions);

        // Insert email log into the database
        const logQuery = `
            INSERT INTO email_log (recipient_email, subject, content)
            VALUES (?, ?, ?)
        `;

        const logValues = ['afaq.khawar@granjur.com', mailOptions.subject,mailOptions.html ];
        await executeQuery(logQuery, logValues, projectDB);
        return decryptedPayload;
    } catch (error) {
        console.error('Error occurred while sending email or logging:', error);
    } 

    return objectResolverOutput;


}



global.SendSupportEmail_object = {
    "versions": {
        "versionData": [{
            "*": {
                "steps": [
                    {
                        "config": {
                            "features": {
                                "multistep": true,
                                "parameters": true,
                                "pagination": false,
                            },
                            "communication": {
                                "encryption": false,
                            },
                            "verification": {
                                "otp": false,
                                "accessToken": false
                            }
                        },
                        "data": {
                            "parameters": {
                                "fields":
                                    [
                                        {
                                            "name": "actionPerformerURDD",
                                            "validations": [],
                                            "required": false,
                                            "source": "req.body"
                                        },
                                        {
                                            "name": "name",
                                            "validations": [],
                                            "required": false,
                                            "source": "req.body"
                                        },
                                        {
                                            "name": "email",
                                            "validations": [],
                                            "required": false,
                                            "source": "req.body"
                                        },
                                        {
                                            "name": "description",
                                            "validations": [],
                                            "required": false,
                                            "source": "req.body"
                                        },
                                        {
                                            "name": "roll_number",
                                            "validations": [],
                                            "required": false,
                                            "source": "req.body"
                                        }
                                    ]
                            },
                            "apiInfo":
                            {
                                preProcessFunction: [],
                                "query": {
                                    "queryNature": "",
                                    "queryPayload": null
                                   ,
                                    "database": "projectDB"
                                },
                                "utilityFunctions": {
                                    "callbackFunction": null,
                                    "payloadFunction": []
                                },
                                postProcessFunction: SendSupportEmail
                            }
                            ,
                            "requestMetaData": {
                                "requestMethod": "POST",
                                "permission": null,
                                "pagination": {
                                    "pageSize": 10
                                }
                            }
                        },
                        "response": {
                            "successMessage": "Student added successfully and enrolled to the course!",
                            "errorMessage": "Failed to save / enroll student."
                        }
                    }
                ]
            },
        }]
    }
}
module.exports = { SendSupportEmail_object };