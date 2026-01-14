const { projectDB } = require('../../../../Services/Integrations/Database/projectDb');
const { executeQuery } = require('../../../../Services/Integrations/Database/queryExecution');

async function verifyPaymentMethodOTP(req, decryptedPayload) {
    let connection;
    
    try {
        const { urdd_id, payment_method_id, otp } = decryptedPayload;
        
        // Validate required fields
        if (!urdd_id || !payment_method_id || !otp) {
            throw new Error('Missing required fields: urdd_id, payment_method_id, otp');
        }

        // Verify OTP from payment_method_otp table
        const otpQuery = `
            SELECT pmotp.*, upm.urdd_id, upm.supported_payment_method_id
            FROM payment_method_otp pmotp
            INNER JOIN user_payment_methods upm ON pmotp.user_payment_method_id = upm.id
            WHERE pmotp.user_payment_method_id = ? 
                AND pmotp.otp = ? 
                AND pmotp.status = 'active'
                AND upm.urdd_id = ?
        `;
        
        const otpResult = await executeQuery(otpQuery, [payment_method_id, otp, urdd_id]);
        
        if (!otpResult || otpResult.length === 0) {
            throw new Error('Invalid OTP or OTP has been used/expired');
        }
        
        // Update payment method to verified and active (remove updated_at)
        const updateQuery = `
            UPDATE user_payment_methods 
            SET is_verified = 1, is_active = 1
            WHERE id = ? AND urdd_id = ?
        `;
        
        const updateResult = await executeQuery(updateQuery, [payment_method_id, urdd_id]);
        
        if (updateResult.affectedRows === 0) {
            throw new Error('Failed to update payment method status');
        }
        
        // Mark OTP as used (remove updated_at)
        const markOtpUsedQuery = `
            UPDATE payment_method_otp 
            SET status = 'used'
            WHERE user_payment_method_id = ? AND otp = ?
        `;
        
        await executeQuery(markOtpUsedQuery, [payment_method_id, otp]);
        
        // If this is set as default, unset other default payment methods for this user
        const checkDefaultQuery = `
            SELECT is_default FROM user_payment_methods 
            WHERE id = ?
        `;
        
        const defaultResult = await executeQuery(checkDefaultQuery, [payment_method_id]);
        
        if (defaultResult && defaultResult.length > 0 && defaultResult[0].is_default) {
            const unsetDefaultQuery = `
                UPDATE user_payment_methods 
                SET is_default = 0 
                WHERE urdd_id = ? AND id != ?
            `;
            
            await executeQuery(unsetDefaultQuery, [urdd_id, payment_method_id]);
        }
        
        // Get payment method details for response
        const paymentMethodQuery = `
            SELECT upm.*, spm.name as provider_name
            FROM user_payment_methods upm
            INNER JOIN supported_payment_methods spm ON upm.supported_payment_method_id = spm.id
            WHERE upm.id = ?
        `;
        
        const paymentMethodResult = await executeQuery(paymentMethodQuery, [payment_method_id]);
        
        return {
            success: true,
            message: "Payment method verified successfully! Your payment method is now active.",
            payment_method: paymentMethodResult[0],
            urdd_id: urdd_id
        };
        
    } catch (error) {
        console.error('Error in verifyPaymentMethodOTP:', error);
        throw new Error(`Failed to verify payment method: ${error.message}`);
    } finally {
        // Release the connection manually
        if (connection) {
            const databaseAbstraction = require('../../../../Services/Integrations/Database/databaseAbstraction');
            databaseAbstraction.releaseConnection(connection);
        }
    }
}

module.exports = verifyPaymentMethodOTP;
