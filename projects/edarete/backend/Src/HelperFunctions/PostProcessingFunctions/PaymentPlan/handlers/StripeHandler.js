const logMessage = require("../../../../../Services/SysFunctions/LogFunctions/consoleLog.js");
const { executeQuery } = require("../../../../../Services/Integrations/Database/queryExecution.js");
const {projectDB} = require("../../../../../Services/Integrations/Database/projectDb.js");


class StripeHandler {
  // Entry point for auto-renewal
  static async process(decryptedPayload, paymentMethod) {
    const handler = new StripeHandler();
    return await handler.processRenewal(decryptedPayload, paymentMethod);
  }

  // Entry point for regular payments
  static async processRegularPayment(decryptedPayload, paymentMethod) {
    const handler = new StripeHandler();
    return await handler.processRegularStripePayment(decryptedPayload, paymentMethod);
  }

  // Handle regular (first-time) Stripe payments
  async processRegularStripePayment(decryptedPayload, paymentMethod) {
    const { urdd_id, plan_id, payment_method_id } = decryptedPayload;
    
    try {
      logMessage([`Stripe regular payment processing`]);
      
      // Get plan details for amount
      const plan = await this.getPlanDetails(plan_id);
      if (!plan) {
        throw new Error(`Plan ${plan_id} not found`);
      }

      // Get user's payment method details
      const userPaymentMethod = await this.getUserPaymentMethod(urdd_id, payment_method_id);
      if (!userPaymentMethod) {
        throw new Error(`User payment method not found`);
      }

      // Create Stripe payment intent or charge
      const stripePaymentResult = await this.createStripePayment({
        amount: plan.price,
        currency: plan.currency_code || 'usd',
        payment_method_details: userPaymentMethod.payment_details,
        metadata: {
          urdd_id: urdd_id,
          plan_id: plan_id,
          payment_type: 'regular_subscription'
        }
      });

      // Log transaction
      await this.logStripeTransaction(urdd_id, plan_id, userPaymentMethod.id, stripePaymentResult, plan.price);

      logMessage([`Stripe regular payment completed:`, stripePaymentResult.status]);

      if (stripePaymentResult.status === 'succeeded') {
        return {
          payment_response: 'success',
          transaction_id: stripePaymentResult.id,
          gateway_response: {
            gateway: 'stripe',
            status: 'succeeded',
            stripe_payment_intent_id: stripePaymentResult.id,
            amount: plan.price,
            currency: plan.currency_code || 'usd',
            message: 'Regular payment successful'
          },
          is_auto_renewal: false,
          renewal_method: 'regular_payment'
        };
      } else {
        return {
          payment_response: 'failure',
          transaction_id: stripePaymentResult.id || `stripe_regular_failed_${Date.now()}`,
          gateway_response: {
            gateway: 'stripe',
            status: stripePaymentResult.status || 'failed',
            stripe_payment_intent_id: stripePaymentResult.id,
            amount: plan.price,
            currency: plan.currency_code || 'usd',
            message: stripePaymentResult.last_payment_error?.message || 'Regular payment failed'
          },
          is_auto_renewal: false,
          renewal_method: 'regular_payment'
        };
      }

    } catch (error) {
      console.error(`Stripe regular payment failed:`, error);
      return {
        payment_response: 'failure',
        transaction_id: `stripe_regular_failed_${Date.now()}`,
        gateway_response: {
          gateway: 'stripe',
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
      logMessage([`Stripe auto-renewal processing for subscription ${subscription_id}`]);
      
      // Get subscription details
      const subscription = await this.getSubscriptionDetails(subscription_id);
      if (!subscription) {
        throw new Error(`Subscription ${subscription_id} not found`);
      }

      // Verify Stripe subscription status
      const stripeStatus = await this.verifyStripeSubscription(subscription);
      
      if (stripeStatus.isActive) {
        // Stripe will handle renewal automatically
        await this.handleStripeManagedRenewal(subscription, stripeStatus, paymentMethod);
        
        return {
          payment_response: 'success',
          transaction_id: `stripe_managed_${Date.now()}`,
          gateway_response: {
            gateway: 'stripe',
            status: 'gateway_managed',
            message: 'Stripe will handle renewal automatically',
            stripe_status: stripeStatus.status,
            period_end: stripeStatus.currentPeriodEnd
          },
          is_auto_renewal: true,
          renewal_method: 'stripe_managed'
        };
        
      } else {
        // Stripe subscription is not active
        await this.handleInactiveStripeSubscription(subscription, stripeStatus, paymentMethod);
        
        return {
          payment_response: 'failure',
          transaction_id: `stripe_inactive_${Date.now()}`,
          gateway_response: {
            gateway: 'stripe',
            status: 'inactive',
            message: `Stripe subscription is ${stripeStatus.status}`,
            stripe_status: stripeStatus.status
          },
          is_auto_renewal: true,
          renewal_method: 'stripe_managed'
        };
      }

    } catch (error) {
      console.error(`Stripe auto-renewal failed:`, error);
      throw error;
    }
  }

  // Create Stripe payment (stub for regular payments)
  async createStripePayment(paymentData) {
    logMessage([`Stub: Creating Stripe payment for amount ${paymentData.amount}`]);
    
    // STUB - Replace with actual Stripe API call
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: paymentData.amount * 100, // Stripe uses cents
    //   currency: paymentData.currency,
    //   payment_method: paymentData.payment_method_details.stripe_payment_method_id,
    //   confirm: true,
    //   metadata: paymentData.metadata
    // });
    // return paymentIntent;

    // Mock Stripe payment response
    const isSuccess = Math.random() > 0.05; // 95% success rate
    
    if (isSuccess) {
      return {
        id: `pi_${Date.now()}_mock`,
        status: 'succeeded',
        amount: paymentData.amount * 100,
        currency: paymentData.currency,
        metadata: paymentData.metadata
      };
    } else {
      return {
        id: `pi_${Date.now()}_mock_failed`,
        status: 'failed',
        amount: paymentData.amount * 100,
        currency: paymentData.currency,
        last_payment_error: {
          message: 'Your card was declined.',
          code: 'card_declined'
        }
      };
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

  // Log Stripe transaction
  async logStripeTransaction(urdd_id, plan_id, user_payment_method_id, stripeResult, amount) {
    try {
      const connection = await projectDB();
      
      try {
        const currencyQuery = `SELECT id FROM currencies WHERE code = 'USD' LIMIT 1`;
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
          stripeResult.status === 'succeeded' ? 'success' : 'failure',
          JSON.stringify(stripeResult),
          `Stripe regular payment for plan ${plan_id}`
        ], connection, false);

      } finally {
        connection.end();
      }
    } catch (error) {
      console.error('Error logging Stripe transaction:', error);
    }
  }

  // Get subscription details
  async getSubscriptionDetails(subscriptionId) {
    const query = `
      SELECT 
        s.*,
        p.name as plan_name,
        p.duration_type,
        p.ai_credits_amount,
        p.price,
        t.gateway_response,
        t.status as transaction_status,
        t.created_at as last_transaction_date
      FROM application_subscriptions s
      INNER JOIN plans p ON s.plan_id = p.id
      LEFT JOIN transactions t ON s.id = t.subscription_id
      WHERE s.id = ? AND s.status = 'active'
      ORDER BY t.created_at DESC
      LIMIT 1
    `;
    
    const connection = await projectDB();
    try {
      const result = await executeQuery(query, [subscriptionId], connection, false);
      return result[0] || null;
    } finally {
      connection.end();
    }
  }

  // Verify Stripe subscription
  async verifyStripeSubscription(subscription) {
    logMessage([`Verifying Stripe subscription for ${subscription.id}`]);
    
    // STUB - Stripe API call
    const stripeSubscriptionId = subscription.gateway_response?.stripe_subscription_id;
    
    if (!stripeSubscriptionId) {
      return {
        isActive: false,
        status: 'no_stripe_subscription',
        message: 'No Stripe subscription ID found'
      };
    }

    // Mock Stripe API response 
    const stripeData = await this.callStripeAPI(stripeSubscriptionId);
    
    return {
      isActive: stripeData.status === 'active',
      status: stripeData.status,
      currentPeriodEnd: stripeData.current_period_end,
      customer: stripeData.customer,
      stripeData: stripeData
    };
  }

  // Call Stripe API
  async callStripeAPI(subscriptionId) {
    // STUB - Stripe API call
    logMessage([`Stub: Calling Stripe API for subscription ${subscriptionId}`]);
    
    return {
      id: subscriptionId,
      status: 'active',
      current_period_end: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60),
      customer: 'cus_xxx',
      items: [{ price: 'price_xxx' }]
    };
  }

  // Handle Stripe managed renewal
  async handleStripeManagedRenewal(subscription, stripeStatus, paymentMethod) {
    const connection = await projectDB();
    
    try {
      // Log that Stripe is managing renewal
      await executeQuery(`
        INSERT INTO subscription_renewal 
        (subscription_id, transaction_id, status, renewal_type, created_at)
        VALUES (?, ?, 'gateway_managed', 'auto_renewal', NOW())
      `, [subscription.id, 0], connection, false);

      // Update subscription status
      await executeQuery(`
        UPDATE application_subscriptions 
        SET status = 'active'
        WHERE id = ?
      `, [subscription.id], connection, false);

      logMessage([`Stripe renewal managed for subscription ${subscription.id}`]);

    } finally {
      connection.end();
    }
  }

  // Handle inactive Stripe subscription
  async handleInactiveStripeSubscription(subscription, stripeStatus, paymentMethod) {
    const connection = await projectDB();
    
    try {
      // Log inactive Stripe subscription
      await executeQuery(`
        INSERT INTO subscription_renewal 
        (subscription_id, transaction_id, status, renewal_type, created_at)
        VALUES (?, ?, 'gateway_inactive', 'auto_renewal', NOW())
      `, [subscription.id, 0], connection, false);

      // Update subscription status
      await executeQuery(`
        UPDATE application_subscriptions 
        SET status = 'stripe_inactive'
        WHERE id = ?
      `, [subscription.id], connection, false);

      logMessage([`Stripe subscription marked as inactive for subscription ${subscription.id}`]);

    } finally {
      connection.end();
    }
  }
}

module.exports = StripeHandler;
