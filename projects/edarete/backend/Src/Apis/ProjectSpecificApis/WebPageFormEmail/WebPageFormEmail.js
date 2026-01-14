const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution");
const db = require("../../../../Services/Integrations/Database/databaseAbstraction.js");
// const sendEmail = require('../../../../Constants/sendEmailOTP.js');
const nodemailer = require('nodemailer');
const logMessage = require('../../../../Services/SysFunctions/LogFunctions/consoleLog')


async function SendSupportEmail(req, decryptedPayload) {    

    
    let {name, email, description} = req.body;
    logMessage([name, email, description]);

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
                            <p>You have recieved a support message on Edarete Web Portal</p>
                            <p> Name: ${name}</p>
                            <p> Email: ${email}</p>
                            <p> Description: ${description}</p>
                        </div>
                    </body>
                </html>
            `
        };

        // Send email
        let info = await transporter.sendMail(mailOptions);

        // Insert email log into the database
    
    } catch (error) {
        console.error('Error occurred while sending email or logging:', error);
    } 

}



global.EdareteEmail_object = {
    "versions": {
        "versionData": [{
            "*": {
                "steps": [
                    {
                        "config": {
                            "features": {
                                "multistep": false,
                                "parameters": false,
                                "pagination": false,
                            },
                            "communication": {
                                "encryption": false,
                                // "encryption": {
                                //     "platformEncryption": true,
                                //     //"accessToken": false,
                                // }
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
                                // "pagination": {
                                //     "pageSize": 10
                                // }
                            }
                        },
                        "response": {
                            "successMessage": "Successfully sent support email!",
                            "errorMessage": "Failed to send support email!"
                        }
                    }
                ]
            },
        }]
    }
}
module.exports = { EdareteEmail_object };