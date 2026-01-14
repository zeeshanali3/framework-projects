const getDateTime = require("../../../../Services/SysFunctions/getDateTime");
const handleSendEmail = require("../../../../Services/SysFunctions/sendEmail");
const {projectDB} = require("../../../../Services/Integrations/Database/projectDb");
const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution");
const otpGenerator = require("otp-generator");

async function forgotPw(req, decryptedPayload) {
    const { email, objectResolverOutput } = decryptedPayload;
    const [_, __, CurrentDateTime] = getDateTime();

    if (!objectResolverOutput || objectResolverOutput.length === 0) {
        throw new Error("Incorrect Username or Password");
    }

    const user = objectResolverOutput[0];

    if (user.ban_datetime && new Date(CurrentDateTime) < new Date(user.ban_datetime).getTime() + 24 * 60 * 60 * 1000) {
        throw new Error("Ban time from resetting password not over. Try again later.");
    }

    const OTP = otpGenerator.generate(6, { upperCaseAlphabets: true, specialChars: false });

    const otpQuery = `
        UPDATE users
        SET forget_pw_otp = ?
        WHERE email = ?
    `;

    await executeQuery(otpQuery, [OTP, email]);

    await handleSendEmail(email, OTP); 
}

async function verifyOtp(req, decryptedPayload) {
    const { email, password, objectResolverOutput } = decryptedPayload;
    const [_, __, CurrentDateTime] = getDateTime();

    if (!objectResolverOutput || objectResolverOutput.length === 0) {
        const incrementResetQuery = `
            UPDATE users
            SET forget_pw_otp = NULL, reset_count = reset_count + 1
            WHERE email = ?
        `;
        await executeQuery(incrementResetQuery, [email], connection);

        const checkQuery = `SELECT reset_count FROM users WHERE email = ?`;
        const checkResults = await executeQuery(checkQuery, [email]);

        const resetCount = checkResults?.[0]?.reset_count || 0;

        if (resetCount >= 3) {
            const banQuery = `
                UPDATE users
                SET ban_datetime = ?
                WHERE email = ?
            `;
            await executeQuery(banQuery, [CurrentDateTime, email]);

            throw new Error("Too many incorrect attempts. Try again in 24 hours.");
        } else {
            throw new Error("Incorrect OTP.");
        }
    } else {
        const updatePasswordQuery = `
            UPDATE users
            SET password = ?, forget_pw_otp = NULL, reset_count = 0
            WHERE email = ?
        `;
        await executeQuery(updatePasswordQuery, [password, email]);
    }
}

module.exports = { forgotPw, verifyOtp };
