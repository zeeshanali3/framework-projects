const logMessage = require("../../../../Services/SysFunctions/LogFunctions/consoleLog.js");
const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution.js");
const {projectDB} = require("../../../../Services/Integrations/Database/projectDb.js");

async function paymentPlanHandler(req, decryptedPayload) {
  try {
    const { urdd_id, plan_id, payment_method_id, payment_method, gateway_response, transaction_id } = decryptedPayload;
    
    if (!urdd_id) {
      throw new Error("URDD ID is required but not found in request payload");
    }
    
    logMessage(["Payment Plan Handler - Processing:", { 
      plan_id, 
      payment_method,
      urdd_id,
      transaction_id 
    }]);
    
    if (decryptedPayload.payment_response === "success") {
      const connection = await projectDB();
      
      try {
        await logTransaction(connection, urdd_id, plan_id, payment_method, payment_method_id, gateway_response, transaction_id, 'success');
        
        const permissionGroupsQuery = `
          SELECT pg.permission_group_id 
          FROM plan_groups pg 
          WHERE pg.plan_id = ? AND pg.status = 'active'
        `;
        
        const permissionGroups = await executeQuery(permissionGroupsQuery, [plan_id], connection, false);
        logMessage(["Found permission groups:", permissionGroups]);
        
        let totalPermissionsAssigned = 0;
        
        for (const pg of permissionGroups) {
          const individualPermissionsQuery = `
            SELECT permission_id 
            FROM permission_groups_permissions 
            WHERE group_id = ? AND status = 'active'
          `;
          
          const individualPermissions = await executeQuery(individualPermissionsQuery, [pg.permission_group_id], connection, false);
          logMessage([`Found ${individualPermissions.length} permissions for group ${pg.permission_group_id}:`, individualPermissions]);
          
          // Check for duplicates before inserting
          for (const perm of individualPermissions) {
            // Check if permission already exists for this user
            const existingPermissionQuery = `
              SELECT user_role_designation_permission_id 
              FROM user_role_designation_permissions 
              WHERE user_role_designation_department_id = ? 
                AND permission_id = ? 
                AND status = 'active'
            `;
            
            const existingPermission = await executeQuery(existingPermissionQuery, [urdd_id, perm.permission_id], connection, false);
            
            if (existingPermission.length === 0) {
              // Permission doesn't exist, safe to insert
              const insertPermissionQuery = `
                INSERT INTO user_role_designation_permissions 
                (user_role_designation_department_id, permission_id, excluded_id, included_id, status, created_by, updated_by)
                VALUES (?, ?, ?, ?, 'active', ?, ?)
              `;
              
              await executeQuery(insertPermissionQuery, [
                urdd_id,
                perm.permission_id,
                null,
                null,
                urdd_id,
                urdd_id
              ], connection, false);
              
              totalPermissionsAssigned++;
              logMessage([` New permission ${perm.permission_id} assigned`]);
            } else {
              // Permission already exists, skip insertion
              logMessage([`⏭ Permission ${perm.permission_id} already exists, skipping`]);
            }
          }
        }
        
        logMessage([`Total permissions assigned: ${totalPermissionsAssigned}`]);
        
        const updateSubscriptionQuery = `
          UPDATE application_subscriptions 
          SET status = 'active'
          WHERE urdd_id = ? AND plan_id = ?
        `;
        
        await executeQuery(updateSubscriptionQuery, [urdd_id, plan_id], connection, false);
        
        connection.end();
        
        return {
          success: true,
          message: "Payment successful! Permissions have been assigned.",
          urdd_id: urdd_id,
          payment_method: payment_method,
          transaction_id: transaction_id,
          permission_groups_count: permissionGroups.length,
          individual_permissions_count: totalPermissionsAssigned,
          redirect_url: "/dashboard"
        };
        
      } catch (error) {
        connection.end();
        throw error;
      }
      
    } else if (decryptedPayload.payment_response === "failed") {
      logMessage([`Payment failed for URDD ${urdd_id}, plan ${plan_id}, transaction ${transaction_id}`]);
      
      const connection = await projectDB();
      try {
        await logTransaction(connection, urdd_id, plan_id, payment_method, payment_method_id, gateway_response, transaction_id, 'failed');
        
        // Only remove permissions exclusive to the failed plan
        logMessage(["Payment failed. Performing smart permission cleanup..."]);
        
        const permissionsCleaned = await smartPermissionCleanup(urdd_id, plan_id, connection);
        
        const updateFailedQuery = `
          UPDATE application_subscriptions 
          SET status = 'failed'
          WHERE urdd_id = ? AND plan_id = ?
        `;
        
        await executeQuery(updateFailedQuery, [urdd_id, plan_id], connection, false);
        connection.end();
        
        return {
          success: false,
          message: "Payment failed. Permissions have been adjusted accordingly.",
          urdd_id: urdd_id,
          payment_method: payment_method,
          transaction_id: transaction_id,
          permissions_cleaned: permissionsCleaned,
          error_code: gateway_response?.error_code || 'PAYMENT_FAILED',
          error_message: gateway_response?.error_message || 'Payment processing failed',
          redirect_url: "/payment/failed"
        };
      } catch (error) {
        connection.end();
        throw error;
      }
      
    } else if (decryptedPayload.payment_response === "stall") {
      const connection = await projectDB();
      try {
        await logTransaction(connection, urdd_id, plan_id, payment_method, payment_method_id, gateway_response, transaction_id, 'pending');
        
        //Only remove permissions exclusive to the pending plan
        logMessage(["Payment is pending. Performing smart permission cleanup..."]);
        
        const permissionsCleaned = await smartPermissionCleanup(urdd_id, plan_id, connection);
        
        const updatePendingQuery = `
          UPDATE application_subscriptions 
          SET status = 'pending'
          WHERE urdd_id = ? AND plan_id = ?
        `;
        
        await executeQuery(updatePendingQuery, [urdd_id, plan_id], connection, false);
        connection.end();
        
        return {
          success: false,
          message: "Payment is pending. Please complete the payment to get permissions.",
          urdd_id: urdd_id,
          payment_method: payment_method,
          transaction_id: transaction_id,
          permissions_cleaned: permissionsCleaned,
          redirect_url: "/payment/pending"
        };
      } catch (error) {
        connection.end();
        throw error;
      }
    }
    
  } catch (error) {
    console.error("Payment Plan Handler Error:", error);
    throw new Error("Failed to process payment plan");
  }
}

async function logTransaction(connection, urdd_id, plan_id, payment_method, payment_method_id, gateway_response, transaction_id, status) {
  try {
    const planQuery = `
      SELECT p.price, p.currency_id 
      FROM plans p 
      WHERE p.id = ? AND p.is_active = 1
    `;
    
    const planResult = await executeQuery(planQuery, [plan_id], connection, false);
    const planPrice = planResult[0]?.price || 0;
    const currencyId = planResult[0]?.currency_id || 1;
    
    const transactionQuery = `
      INSERT INTO transactions (
        urdd_id, amount, currency_id, transaction_type, status,
        gateway_response, description
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const description = `Plan ${plan_id} payment via ${payment_method} - ${status}`;
    
    await executeQuery(transactionQuery, [
      urdd_id,
      planPrice,
      currencyId,
      'plan_payment',
      status,
      JSON.stringify({
        payment_method: payment_method,
        payment_method_id: payment_method_id,
        gateway_response: gateway_response,
        transaction_id: transaction_id
      }),
      description
    ], connection, false);
    
    logMessage([`Transaction logged: ${status} for URDD ${urdd_id}, Plan ${plan_id}`]);
    
  } catch (error) {
    console.error("Error logging transaction:", error);
    throw error;
  }
}

async function smartPermissionCleanup(urdd_id, failedPlanId, connection) {
  logMessage([` Smart cleanup for failed plan ${failedPlanId}, URDD ${urdd_id}`]);
  
  try {
    // 🔑 STEP 1: Check if user has other active subscriptions
    const otherActiveSubscriptionsQuery = `
      SELECT COUNT(*) as count
      FROM application_subscriptions 
      WHERE urdd_id = ? 
        AND plan_id != ? 
        AND status = 'active'
    `;
    
    const otherSubsResult = await executeQuery(otherActiveSubscriptionsQuery, 
      [urdd_id, failedPlanId], connection, false);
    
    const hasOtherActiveSubs = otherSubsResult[0].count > 0;
    
    if (!hasOtherActiveSubs) {
      logMessage(["No other active subscriptions found - removing all permissions from failed plan"]);
      
      // Get all permissions from the failed plan
      const allPermissionsQuery = `
        SELECT DISTINCT pgp.permission_id
        FROM plan_groups pg
        INNER JOIN permission_groups_permissions pgp ON pg.permission_group_id = pgp.group_id
        WHERE pg.plan_id = ? AND pg.status = 'active' 
          AND pgp.status = 'active'
      `;
      
      const allPermissions = await executeQuery(allPermissionsQuery, [failedPlanId], connection, false);
      
      if (allPermissions.length === 0) {
        logMessage(["No permissions found for failed plan - nothing to clean up"]);
        return 0;
      }
      
      // Remove all permissions from the failed plan
      const permissionIds = allPermissions.map(p => p.permission_id);
      const placeholders = permissionIds.map(() => '?').join(',');
      
      const removeAllPermissionsQuery = `
        DELETE FROM user_role_designation_permissions 
        WHERE user_role_designation_department_id = ? 
          AND permission_id IN (${placeholders})
          AND status = 'active'
      `;
      
      await executeQuery(removeAllPermissionsQuery, 
        [urdd_id, ...permissionIds], connection, false);
      
      logMessage([` Successfully removed ${allPermissions.length} permissions (no other active subscriptions)`]);
      
      // Log the cleanup
      await logPermissionCleanup(connection, urdd_id, failedPlanId, permissionIds);
      
      return allPermissions.length;
    }
    
    // 🔑 STEP 2: User has other active subscriptions - use UNION logic
    logMessage(["Other active subscriptions found - using smart cleanup logic"]);
    
    const exclusivePermissionsQuery = `
      SELECT DISTINCT pgp.permission_id
      FROM plan_groups pg
      INNER JOIN permission_groups_permissions pgp ON pg.permission_group_id = pgp.group_id
      WHERE pg.plan_id = ? AND pg.status = 'active' 
        AND pgp.status = 'active'
        AND pgp.permission_id NOT IN (
          -- Union of all permissions from other active subscriptions
          SELECT DISTINCT pgp2.permission_id
          FROM application_subscriptions sub2
          INNER JOIN plan_groups pg2 ON sub2.plan_id = pg2.plan_id
          INNER JOIN permission_groups_permissions pgp2 ON pg2.permission_group_id = pgp2.group_id
          WHERE sub2.urdd_id = ? 
            AND sub2.status = 'active' 
            AND sub2.plan_id != ?
            AND pg2.status = 'active' 
            AND pgp2.status = 'active'
        )
    `;
    
    const exclusivePermissions = await executeQuery(exclusivePermissionsQuery, 
      [failedPlanId, urdd_id, failedPlanId], connection, false);
    
    if (exclusivePermissions.length === 0) {
      logMessage(["No exclusive permissions found for failed plan - nothing to clean up"]);
      return 0;
    }
    
    logMessage([`Found ${exclusivePermissions.length} exclusive permissions to remove:`, 
      exclusivePermissions.map(p => p.permission_id)]);
    
    // Remove only the exclusive permissions
    const exclusivePermissionIds = exclusivePermissions.map(p => p.permission_id);
    const placeholders = exclusivePermissionIds.map(() => '?').join(',');
    
    const removeExclusivePermissionsQuery = `
      DELETE FROM user_role_designation_permissions 
      WHERE user_role_designation_department_id = ? 
        AND permission_id IN (${placeholders})
        AND status = 'active'
    `;
    
    await executeQuery(removeExclusivePermissionsQuery, 
      [urdd_id, ...exclusivePermissionIds], connection, false);
    
    logMessage([` Successfully removed ${exclusivePermissions.length} exclusive permissions`]);
    
    // Log the cleanup
    await logPermissionCleanup(connection, urdd_id, failedPlanId, exclusivePermissionIds);
    
    return exclusivePermissions.length;
    
  } catch (error) {
    console.error("Error during smart permission cleanup:", error);
    throw new Error(`Permission cleanup failed: ${error.message}`);
  }
}

// 🔑 NEW: Log permission cleanup for audit trail
async function logPermissionCleanup(connection, urdd_id, plan_id, permission_ids) {
  try {
    // Create a simple audit log in the console for now
    // In production, you might want to store this in a dedicated audit table
    logMessage([` AUDIT: Permission cleanup for URDD ${urdd_id}, Plan ${plan_id}`]);
    logMessage([` AUDIT: Removed ${permission_ids.length} permissions:`, permission_ids]);
    logMessage([` AUDIT: Timestamp: ${new Date().toISOString()}`]);
    
  } catch (error) {
    console.error("Error logging permission cleanup:", error);
    // Don't throw - this is just audit logging
  }
}

module.exports = paymentPlanHandler;
