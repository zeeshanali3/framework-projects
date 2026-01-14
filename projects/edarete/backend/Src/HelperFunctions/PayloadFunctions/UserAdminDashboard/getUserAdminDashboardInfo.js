const logMessage = require("../../../../Services/SysFunctions/LogFunctions/consoleLog.js");
const { executeQuery } = require('../../../../Services/Integrations/Database/queryExecution');
const { projectDB } = require('../../../../Services/Integrations/Database/projectDb');

/**
 * Get total AI credits and usage for a specific user
 */
async function getUserCreditsSummary(urddId) {
    try {
        const query = `
            SELECT 
                COALESCE(SUM(p.ai_credits_amount), 0) as total_credits,
                COALESCE(SUM(sul.amount), 0) as total_used_credits
            FROM application_subscriptions aps
            JOIN plans p ON aps.plan_id = p.id
            LEFT JOIN subscription_renewal sr ON aps.id = sr.subscription_id
            LEFT JOIN subscription_utilization_logs sul ON sr.id = sul.subscription_renewal_id
            WHERE aps.urdd_id = ? AND aps.status = 'active'
        `;
        
        const result = await executeQuery(query, [urddId]);
        
        return {
            total_ai_credits: result[0]?.total_credits || 0,
            total_used_credits: result[0]?.total_used_credits || 0
        };
    } catch (error) {
        console.error('Error getting user credits summary:', error);
        throw error;
    }
}

/**
 * Get service-specific usage (AI Timetable & AI Import) for a user
 */
async function getUserServiceUsage(urddId) {
    try {
        const query = `
            SELECT 
                sul.usage_type,
                SUM(sul.amount) as total_used
            FROM subscription_utilization_logs sul
            JOIN subscription_renewal sr ON sul.subscription_renewal_id = sr.id
            JOIN application_subscriptions aps ON sr.subscription_id = aps.id
            WHERE aps.urdd_id = ? 
                AND sul.usage_type IN ('ai_timetable', 'ai_import')
                AND aps.status = 'active'
            GROUP BY sul.usage_type
        `;
        
        const result = await executeQuery(query, [urddId]);
        
        // Initialize with default values
        const usage = {
            ai_timetable_usage: 0,
            ai_import_usage: 0
        };
        
        // Map results to usage object
        result.forEach(row => {
            if (row.usage_type === 'ai_timetable') {
                usage.ai_timetable_usage = row.total_used || 0;
            } else if (row.usage_type === 'ai_import') {
                usage.ai_import_usage = row.total_used || 0;
            }
        });
        
        return usage;
    } catch (error) {
        console.error('Error getting user service usage:', error);
        throw error;
    }
}

/**
 * Get active subscriptions with service details for a user
 */
async function getUserActiveSubscriptions(urddId) {
    try {
        const query = `
            SELECT 
                p.name as plan_name,
                p.duration_type,
                p.ai_credits_amount,
                p.services,
                aps.start_date,
                aps.expiry_date,
                aps.auto_renew,
                c.code as currency_code,
                p.price
            FROM application_subscriptions aps
            JOIN plans p ON aps.plan_id = p.id
            JOIN currencies c ON p.currency_id = c.id
            WHERE aps.urdd_id = ? AND aps.status = 'active'
            ORDER BY aps.expiry_date ASC
        `;
        
        const result = await executeQuery(query, [urddId]);
        
        // Process the results to format them properly
        return result.map(subscription => {
            // Parse services JSON if it exists
            let services = [];
            try {
                if (subscription.services) {
                    services = JSON.parse(subscription.services);
                }
            } catch (e) {
                services = [];
            }
            
            // Format credits display
            const creditsDisplay = `${subscription.ai_credits_amount.toLocaleString()} / ${subscription.duration_type}`;
            
            // Format expiry date
            const expiryDate = new Date(subscription.expiry_date);
            const formattedExpiry = expiryDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
            });
            
            return {
                plan_name: subscription.plan_name,
                credits: creditsDisplay,
                services: services,
                status: "ACTIVE",
                expires: formattedExpiry,
                auto_renew: subscription.auto_renew ? "ON" : "OFF",
                currency: subscription.currency_code,
                price: subscription.price
            };
        });
    } catch (error) {
        console.error('Error getting user active subscriptions:', error);
        throw error;
    }
}

/**
 * Get system alerts and activity logs for a user
 */
async function getUserSystemAlerts(urddId) {
    try {
        // Get user notifications only (simplified for now)
        const query = `
            SELECT 
                n.notification_title,
                n.notification_message,
                n.created_at,
                'notification' as alert_type
            FROM notifications n
            WHERE n.sent_to_user_role_designation_department_id = ?
                AND n.status = 'active'
            ORDER BY n.created_at DESC
            LIMIT 10
        `;
        
        const result = await executeQuery(query, [urddId]);
        
        // Process and format the alerts
        return result.map(alert => {
            const timestamp = new Date(alert.created_at);
            const now = new Date();
            const diffMs = now - timestamp;
            const diffMins = Math.floor(diffMs / (1000 * 60));
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            
            let timeAgo;
            if (diffMins < 60) {
                timeAgo = `${diffMins} minutes ago`;
            } else if (diffHours < 24) {
                timeAgo = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
            } else {
                timeAgo = timestamp.toLocaleDateString();
            }
            
            return {
                title: alert.notification_title,
                message: alert.notification_message,
                timestamp: timestamp.toISOString(),
                time_ago: timeAgo,
                alert_type: alert.alert_type
            };
        });
        
    } catch (error) {
        console.error('Error getting user system alerts:', error);
        throw error;
    }
}

/**
 * Main function to execute all user dashboard queries
 */
async function executeUserDashboardQueries(req, res) {
    try {
        // Get user URDD ID from query parameters (since we're passing it as ?urdd_id=1)
        const urddId = req.query?.urdd_id || req.user?.urdd_id || req.body?.urdd_id;
        
        if (!urddId) {
            throw new Error('User URDD ID not found');
        }
        
        logMessage(['Using URDD ID:', urddId]); // Add this for debugging
        
        const resultsObject = {};
        
        // Execute queries sequentially to avoid connection conflicts
        const creditsSummary = await getUserCreditsSummary(urddId);
        const serviceUsage = await getUserServiceUsage(urddId);
        const activeSubscriptions = await getUserActiveSubscriptions(urddId);
        const systemAlerts = await getUserSystemAlerts(urddId);
        
        // Compile results
        resultsObject.statistics = {
            ...creditsSummary,
            ...serviceUsage
        };
        
        resultsObject.active_subscriptions = activeSubscriptions;
        resultsObject.system_alerts = systemAlerts;
        
        return resultsObject;
    } catch (error) {
        console.error('Error executing user dashboard queries:', error);
        throw error;
    }
}

module.exports = {
    getUserCreditsSummary,
    getUserServiceUsage,
    getUserActiveSubscriptions,
    getUserSystemAlerts,
    executeUserDashboardQueries
};
