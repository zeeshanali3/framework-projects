const logMessage = require("../../../../../Services/SysFunctions/LogFunctions/consoleLog.js");
const { executeQuery } = require("../../../../../Services/Integrations/Database/queryExecution.js");
const {projectDB} = require("../../../../../Services/Integrations/Database/projectDb.js");

class ManualAutoRenewalHandler {
  // Entry point for auto-renewal
  static async process(decryptedPayload, paymentMethod) {
    const handler = new ManualAutoRenewalHandler();
    return await handler.processRenewal(decryptedPayload, paymentMethod);
  }

  // Entry point for both auto-renewal and regular payments
  static async processPayment(decryptedPayload, paymentMethod, isAutoRenewal = false) {
    const handler = new ManualAutoRenewalHandler();
    
    if (isAutoRenewal) {
      logMessage([`Processing auto-renewal for ${paymentMethod.name}`]);
      return await handler.processRenewal(decryptedPayload, paymentMethod);
    } else {
      logMessage([`Processing regular payment for ${paymentMethod.name}`]);
      return await handler.processRegularPayment(decryptedPayload, paymentMethod);
    }
  }

  // Handle regular (first-time) payments
  async processRegularPayment(decryptedPayload, paymentMethod) {
    const { urdd_id, plan_id, payment_method_id } = decryptedPayload;
    
    try {
      logMessage([`Regular payment processing for ${paymentMethod.name}`]);
      
      // Get user's payment method details
      const userPaymentMethod = await this.getUserPaymentMethod(urdd_id, paymentMethod.id);
      if (!userPaymentMethod) {
        throw new Error(`User payment method not found or not verified`);
      }

      // Get plan details for amount
      const plan = await this.getPlanDetails(plan_id);
      if (!plan) {
        throw new Error(`Plan ${plan_id} not found`);
      }

      // Create payment payload
      const paymentPayload = {
        urdd_id: urdd_id,
        plan_id: plan_id,
        payment_method_id: paymentMethod.id,
        payment_details: userPaymentMethod.payment_details,
        amount: plan.price,
        currency: 'PKR',
        is_auto_renewal: false
      };

      // Process payment through appropriate gateway
      const paymentResult = await this.processPaymentThroughGateway(paymentMethod, userPaymentMethod, paymentPayload);
      
      // Log transaction
      await this.logPaymentTransaction(urdd_id, plan_id, userPaymentMethod.id, paymentResult, plan.price);

      logMessage([`Regular payment completed for ${paymentMethod.name}:`, paymentResult.payment_response]);
      
      return {
        ...paymentResult,
        is_auto_renewal: false,
        renewal_method: 'regular_payment'
      };

    } catch (error) {
      console.error(`Regular payment failed:`, error);
      return {
        payment_response: 'failure',
        transaction_id: `manual_regular_failed_${Date.now()}`,
        gateway_response: {
          gateway: paymentMethod.name,
          status: 'failed',
          message: error.message
        },
        is_auto_renewal: false,
        renewal_method: 'regular_payment'
      };
    }
  }

  // Handle auto-renewal payments
  async processRenewal(decryptedPayload, paymentMethod) {
    const { urdd_id, plan_id, subscription_id } = decryptedPayload;
    
    try {
      logMessage([`Manual auto-renewal processing for subscription ${subscription_id}`]);
      
      // Get subscription details
      const subscription = await this.getSubscriptionDetails(subscription_id);
      if (!subscription) {
        throw new Error(`Subscription ${subscription_id} not found`);
      }

      // Get user's default payment method details
      const userPaymentMethod = await this.getUserPaymentMethod(urdd_id, paymentMethod.id);
      if (!userPaymentMethod) {
        throw new Error(`User payment method not found or not verified`);
      }

      // Check grace period and retry count
      const gracePeriodStatus = await this.checkGracePeriod(subscription);
      
      logMessage([`Grace period status:`, {
        isInGracePeriod: gracePeriodStatus.isInGracePeriod,
        retryCount: gracePeriodStatus.retryCount,
        gracePeriodEnd: gracePeriodStatus.gracePeriodEnd
      }]);

      // Check if max retries reached
      if (gracePeriodStatus.retryCount >= 3) {
        if (gracePeriodStatus.isInGracePeriod) {
          logMessage([`Max retries (${gracePeriodStatus.retryCount}) reached within grace period`]);
          
          return {
            payment_response: 'failure',
            transaction_id: `manual_retry_max_${Date.now()}`,
            gateway_response: {
              gateway: paymentMethod.name,
              status: 'max_retries_reached',
              message: 'Maximum retry attempts reached. Please contact support.',
              grace_period_expired: false,
              retry_count: gracePeriodStatus.retryCount
            },
            is_auto_renewal: true,
            renewal_method: 'manual_cron'
          };
          
        } else {
          logMessage([`Grace period expired AND max retries reached. Final failure.`]);
          
          await this.handleMaxRetriesReached(subscription);
          
          return {
            payment_response: 'failure',
            transaction_id: `manual_retry_max_${Date.now()}`,
            gateway_response: {
              gateway: paymentMethod.name,
              status: 'max_retries_reached',
              message: 'Maximum retry attempts reached. Grace period expired. Please contact support.',
              grace_period_expired: true,
              retry_count: gracePeriodStatus.retryCount
            },
            is_auto_renewal: true,
            renewal_method: 'manual_cron'
          };
        }
      }

      // Process payment (within retry limits)
      logMessage([`Attempting payment (retry ${gracePeriodStatus.retryCount + 1}/3)`]);
      
      const paymentResult = await this.processPaymentThroughGateway(paymentMethod, userPaymentMethod, subscription);
      
      if (paymentResult.payment_response === 'success') {
        await this.handleRenewalSuccess(subscription, paymentResult, userPaymentMethod);
        
        return {
          ...paymentResult,
          is_auto_renewal: true,
          renewal_method: 'manual_cron'
        };
        
      } else {
        await this.handleRenewalFailure(subscription, paymentResult, userPaymentMethod);
        
        return {
          ...paymentResult,
          is_auto_renewal: true,
          renewal_method: 'manual_cron'
        };
      }

    } catch (error) {
      console.error(`Manual auto-renewal failed:`, error);
      throw error;
    }
  }

  // Get plan details
  async getPlanDetails(planId) {
    const query = `
      SELECT 
        p.*,
        c.code as currency_code
      FROM plans p
      LEFT JOIN currencies c ON p.currency_id = c.id
      WHERE p.id = ? AND p.is_active = 1
    `;
    
    const connection = await projectDB();
    try {
      const result = await executeQuery(query, [planId], connection, false);
      return result[0] || null;
    } finally {
      connection.end();
    }
  }

  // Log payment transaction for regular payments
  async logPaymentTransaction(urdd_id, plan_id, user_payment_method_id, paymentResult, amount) {
    try {
      const connection = await projectDB();
      
      try {
        const currencyQuery = `SELECT id FROM currencies WHERE code = 'PKR' LIMIT 1`;
        const currencyResult = await executeQuery(currencyQuery, [], connection, false);
        const currencyId = currencyResult[0]?.id || 1;

        const transactionQuery = `
          INSERT INTO transactions 
          (urdd_id, user_payment_method_id, amount, currency_id, 
           transaction_type, status, gateway_response, description, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `;
        
        await executeQuery(transactionQuery, [
          urdd_id,
          user_payment_method_id,
          amount,
          currencyId,
          'subscription_purchase',
          paymentResult.payment_response,
          JSON.stringify(paymentResult.gateway_response),
          `Regular payment for plan ${plan_id}`
        ], connection, false);

      } finally {
        connection.end();
      }
    } catch (error) {
      console.error('Error logging payment transaction:', error);
    }
  }

  // Get subscription details
  async getSubscriptionDetails(subscriptionId) {
    const query = `
      SELECT 
        s.*,
        p.duration_type,
        p.name as plan_name,
        p.price,
        p.ai_credits_amount
      FROM application_subscriptions s
      INNER JOIN plans p ON s.plan_id = p.id
      WHERE s.id = ? AND s.status = 'active'
    `;
    
    const connection = await projectDB();
    try {
      const result = await executeQuery(query, [subscriptionId], connection, false);
      return result[0] || null;
    } finally {
      connection.end();
    }
  }

  // Get user payment method
  async getUserPaymentMethod(urdd_id, supportedPaymentMethodId) {
    const query = `
      SELECT 
        upm.*,
        spm.name as provider_name
      FROM user_payment_methods upm
      INNER JOIN supported_payment_methods spm ON upm.supported_payment_method_id = spm.id
      WHERE upm.urdd_id = ? 
        AND upm.supported_payment_method_id = ?
        AND upm.is_default = 1 
        AND upm.is_active = 1 
        AND upm.is_verified = 1
    `;
    
    const connection = await projectDB();
    try {
      const result = await executeQuery(query, [urdd_id, supportedPaymentMethodId], connection, false);
      return result[0] || null;
    } finally {
      connection.end();
    }
  }

  // Process payment through gateway
  async processPaymentThroughGateway(paymentMethod, userPaymentMethod, paymentData) {
    logMessage([`Processing payment through ${paymentMethod.name}`]);
    
    // Create payment payload
    const paymentPayload = {
      urdd_id: paymentData.urdd_id || paymentData.subscription?.urdd_id,
      plan_id: paymentData.plan_id || paymentData.subscription?.plan_id,
      payment_method_id: paymentMethod.id,
      payment_details: userPaymentMethod.payment_details,
      amount: paymentData.amount || paymentData.subscription?.price,
      currency: 'PKR',
      is_auto_renewal: paymentData.is_auto_renewal || false
    };

    // Call the appropriate payment gateway based on payment method name
    switch (paymentMethod.name.toLowerCase()) {
      case 'kuickpay':
        return await this.processKuickPayPayment(paymentPayload);
      case 'jazzcash':
        return await this.processJazzCashPayment(paymentPayload);
      default:
        throw new Error(`Unsupported payment method for manual processing: ${paymentMethod.name}`);
    }
  }

  // Process KuickPay payment
  async processKuickPayPayment(payload) {
    logMessage([`Stub: Processing KuickPay payment`]);
    
    // Simulating payment processing
    const isSuccess = Math.random() > 0.2; 
    
    if (isSuccess) {
      return {
        payment_response: 'success',
        transaction_id: `kuickpay_${payload.is_auto_renewal ? 'auto' : 'regular'}_${Date.now()}`,
        gateway_response: {
          gateway: 'kuickpay',
          status: 'success',
          amount: payload.amount,
          currency: payload.currency,
          message: `${payload.is_auto_renewal ? 'Auto-renewal' : 'Regular'} payment successful`
        }
      };
    } else {
      return {
        payment_response: 'failure',
        transaction_id: `kuickpay_${payload.is_auto_renewal ? 'auto' : 'regular'}_failed_${Date.now()}`,
        gateway_response: {
          gateway: 'kuickpay',
          status: 'failed',
          amount: payload.amount,
          currency: payload.currency,
          message: `${payload.is_auto_renewal ? 'Auto-renewal' : 'Regular'} payment failed`
        }
      };
    }
  }

  // Process JazzCash payment
  async processJazzCashPayment(payload) {
    logMessage([`Stub: Processing JazzCash payment`]);
    
    // Simulating payment processing
    const isSuccess = Math.random() > 0.15; 
    
    if (isSuccess) {
      return {
        payment_response: 'success',
        transaction_id: `jazzcash_${payload.is_auto_renewal ? 'auto' : 'regular'}_${Date.now()}`,
        gateway_response: {
          gateway: 'jazzcash',
          status: 'success',
          amount: payload.amount,
          currency: payload.currency,
          message: `${payload.is_auto_renewal ? 'Auto-renewal' : 'Regular'} payment successful`
        }
      };
    } else {
      return {
        payment_response: 'failure',
        transaction_id: `jazzcash_${payload.is_auto_renewal ? 'auto' : 'regular'}_failed_${Date.now()}`,
        gateway_response: {
          gateway: 'jazzcash',
          status: 'failed',
          amount: payload.amount,
          currency: payload.currency,
          message: `${payload.is_auto_renewal ? 'Auto-renewal' : 'Regular'} payment failed`
        }
      };
    }
  }

  // Check grace period
  async checkGracePeriod(subscription) {
    const query = `
      SELECT 
        COUNT(*) as retry_count,
        MAX(created_at) as last_retry
      FROM subscription_renewal 
      WHERE subscription_id = ? 
        AND renewal_type = 'auto_renewal'
        AND status = 'failed'
        AND created_at >= DATE_SUB(NOW(), INTERVAL 2 DAY)
    `;
    
    const connection = await projectDB();
    try {
      const result = await executeQuery(query, [subscription.id], connection, false);
      const retryCount = result[0]?.retry_count || 0;
      
      const expiryDate = new Date(subscription.expiry_date);
      const gracePeriodEnd = new Date(expiryDate.getTime() + (2 * 24 * 60 * 60 * 1000));
      const isInGracePeriod = new Date() <= gracePeriodEnd;
      
      return {
        isInGracePeriod,
        retryCount,
        gracePeriodEnd,
        lastRetry: result[0]?.last_retry
      };
    } finally {
      connection.end();
    }
  }

  // Handle renewal success
  async handleRenewalSuccess(subscription, paymentResult, userPaymentMethod) {
    const connection = await projectDB();
    
    try {
      // Calculate new expiry date
      const newExpiryDate = await this.calculateNewExpiryDate(subscription);
      
      // Update subscription
      await executeQuery(`
        UPDATE application_subscriptions 
        SET expiry_date = ?, 
            updated_at = NOW()
        WHERE id = ?
      `, [newExpiryDate, subscription.id], connection, false);

      // Log successful renewal
      await executeQuery(`
        INSERT INTO subscription_renewal 
        (subscription_id, transaction_id, status, renewal_type, created_at)
        VALUES (?, ?, 'success', 'auto_renewal', NOW())
      `, [subscription.id, paymentResult.transaction_id], connection, false);

      logMessage([`Renewal successful for subscription ${subscription.id}`]);

    } finally {
      connection.end();
    }
  }

  // Handle renewal failure
  async handleRenewalFailure(subscription, paymentResult, userPaymentMethod) {
    const connection = await projectDB();
    
    try {
      // Log failed renewal
      await executeQuery(`
        INSERT INTO subscription_renewal 
        (subscription_id, transaction_id, status, renewal_type, created_at)
        VALUES (?, ?, 'failed', 'auto_renewal', NOW())
      `, [subscription.id, paymentResult.transaction_id], connection, false);

      logMessage([`Renewal failed for subscription ${subscription.id}`]);

    } finally {
      connection.end();
    }
  }

  // Handle max retries reached
  async handleMaxRetriesReached(subscription) {
    const connection = await projectDB();
    
    try {
      // Mark subscription as expired
      await executeQuery(`
        UPDATE application_subscriptions 
        SET status = 'expired', 
            updated_at = NOW()
        WHERE id = ?
      `, [subscription.id], connection, false);

      logMessage([`Subscription ${subscription.id} marked as expired due to max retries`]);

    } finally {
      connection.end();
    }
  }

  // Calculate new expiry date
  async calculateNewExpiryDate(subscription) {
    const durationType = subscription.duration_type;
    const currentExpiry = new Date(subscription.expiry_date);
    
    let newExpiry;
    
    switch (durationType) {
      case 'monthly':
        newExpiry = new Date(currentExpiry.getTime() + (30 * 24 * 60 * 60 * 1000));
        break;
      case 'yearly':
        newExpiry = new Date(currentExpiry.getTime() + (365 * 24 * 60 * 60 * 1000));
        break;
      default:
        newExpiry = new Date(currentExpiry.getTime() + (30 * 24 * 60 * 60 * 1000));
    }
    
    return newExpiry;
  }
}

module.exports = ManualAutoRenewalHandler;
