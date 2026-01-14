const { projectDB } = require('../../../../Services/Integrations/Database/projectDb');
const { executeQuery } = require('../../../../Services/Integrations/Database/queryExecution');
const handleSendEmail = require('../../../../Services/SysFunctions/sendEmail');
const otpGenerator = require('otp-generator');

async function addPaymentMethodPreProcess(req, decryptedPayload) {
    let connection;
    
    try {
        const { urdd_id, supported_payment_method_id, payment_details, is_default } = decryptedPayload;
        
        // Validate required fields
        if (!urdd_id || !supported_payment_method_id || !payment_details) {
            throw new Error('Missing required fields: urdd_id, supported_payment_method_id, payment_details');
        }

        // Validate payment_details is valid JSON
        let parsedPaymentDetails;
        try {
            parsedPaymentDetails = typeof payment_details === 'string' ? JSON.parse(payment_details) : payment_details;
        } catch (error) {
            throw new Error('Invalid payment_details format. Must be valid JSON.');
        }

        // Get user email from urdd_id
        const userQuery = `
            SELECT u.email 
            FROM users u
            INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
            WHERE urdd.user_role_designation_department_id = ?
        `;
        
        connection = await projectDB();
        const userResult = await executeQuery(userQuery, [urdd_id], connection, false);
        
        if (!userResult || userResult.length === 0) {
            throw new Error('User not found for the provided urdd_id');
        }
        
        const userEmail = userResult[0].email;
        
        // Check if payment method already exists for this user
        const existingQuery = `
            SELECT id FROM user_payment_methods 
            WHERE urdd_id = ? AND supported_payment_method_id = ?
        `;
        
        const existingResult = await executeQuery(existingQuery, [urdd_id, supported_payment_method_id], connection, false);
        
        let paymentMethodId;
        
        if (existingResult && existingResult.length > 0) {
            // Update existing payment method (remove updated_at)
            const updateQuery = `
                UPDATE user_payment_methods 
                SET payment_details = ?
                WHERE id = ?
            `;
            
            await executeQuery(updateQuery, [JSON.stringify(parsedPaymentDetails), existingResult[0].id], connection, false);
            paymentMethodId = existingResult[0].id;
        } else {
            // Insert new payment method (remove updated_at)
            const insertQuery = `
                INSERT INTO user_payment_methods (
                    urdd_id, 
                    supported_payment_method_id, 
                    payment_details, 
                    is_verified, 
                    is_active, 
                    is_default
                ) VALUES (?, ?, ?, 0, 0, ?)
            `;
            
            const insertResult = await executeQuery(insertQuery, [
                urdd_id,
                supported_payment_method_id,
                JSON.stringify(parsedPaymentDetails),
                is_default || 0
            ], connection, false);
            
            paymentMethodId = insertResult.insertId;
        }
        
        // Generate OTP for verification
        const OTP = otpGenerator.generate(6, { upperCaseAlphabets: true, specialChars: false });
        
        // Store OTP in payment_method_otp table with status 'active'
        const otpInsertQuery = `
            INSERT INTO payment_method_otp (user_payment_method_id, otp, status)
            VALUES (?, ?, 'active')
        `;
        
        await executeQuery(otpInsertQuery, [paymentMethodId, OTP], connection, false);
        
        // Send OTP via email
        await handleSendEmail(userEmail, OTP);
        
        // Return success with payment method ID
        return {
            success: true,
            message: "Payment method details saved successfully! Please check your email for OTP verification.",
            payment_method_id: paymentMethodId,
            urdd_id: urdd_id
        };
        
    } catch (error) {
        console.error('Error in addPaymentMethodPreProcess:', error);
        throw new Error(`Failed to add payment method: ${error.message}`);
    } finally {
        // Release the connection manually
        if (connection) {
            const databaseAbstraction = require('../../../../Services/Integrations/Database/databaseAbstraction');
            databaseAbstraction.releaseConnection(connection);
        }
    }
}

module.exports = addPaymentMethodPreProcess;
