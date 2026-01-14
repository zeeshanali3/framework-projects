const { executeQuery } = require('../../../../Services/Integrations/Database/queryExecution');
const {projectDB} = require('../../../../Services/Integrations/Database/projectDb');
const {securityDB} = require('../../../../Services/Integrations/Database/securityDB');
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

// let staticMacDb='new_db'

async function getTableCounts(req, res) {
    try {
        const fetchTablesQuery = `
            SELECT 
                table_name 
            FROM 
                information_schema.tables 
            WHERE 
                table_schema = '${process.env.DB_DATABASE}';`// '${staticMacDb}';`; //'${process.env.DB_DATABASE}';`;
        let connection = await projectDB();
        const tablesResult = await executeQuery( fetchTablesQuery, [], connection);

        if (!tablesResult || tablesResult.length === 0) {
            return {};
        }

        const tableCounts = {};

        for (const table of tablesResult) {
            const tableName = table?.table_name || table?.TABLE_NAME;
            const countQuery = `SELECT COUNT(*) AS record_count FROM \`${tableName}\`;`;
            connection = await projectDB();
            const countResult = await executeQuery( countQuery, [], connection);
            tableCounts[tableName] = countResult[0]?.record_count || 0;
        }

        return tableCounts;
    } catch (error) {

        throw error;
    }
}

/**
 * Query 2: Count of permissions each permission group has.
 */
async function getPermissionsPerGroup(req, res) {
    const query = `
        SELECT 
            pg.permission_group_id AS group_id,
            pg.group_name AS group_name,
            COUNT(p.permission_id) AS permission_count
        FROM 
            permission_groups pg
        LEFT JOIN 
            permission_groups_permissions ppg ON pg.permission_group_id = ppg.group_id
        LEFT JOIN 
            permissions p ON ppg.permission_id = p.permission_id
        GROUP BY 
            pg.permission_group_id, pg.group_name;
    `;
    const connection = await projectDB();
    const result = await executeQuery( query, [], connection);
    return result;
}

/**
 * Query 3: Count of overlapping permissions between permission groups.
 */
async function getOverlappingPermissions(req, res) {
    const query = `
        SELECT 
            g1.permission_group_id AS group1_id, 
            g2.permission_group_id AS group2_id, 
            COUNT(DISTINCT p.permission_id) AS overlapping_permissions_count
        FROM 
            permission_groups_permissions ppg1
        INNER JOIN 
            permission_groups_permissions ppg2 
            ON ppg1.permission_id = ppg2.permission_id 
            AND ppg1.group_id < ppg2.group_id
        INNER JOIN 
            permission_groups g1 ON ppg1.group_id = g1.permission_group_id
        INNER JOIN 
            permission_groups g2 ON ppg2.group_id = g2.permission_group_id
        INNER JOIN 
            permissions p ON ppg1.permission_id = p.permission_id
        GROUP BY 
            g1.permission_group_id, g2.permission_group_id;
    `;
    const connection = await projectDB();

    const result = await executeQuery( query, [], connection);
    return result;

}

/**
 * Query 4: Count of unassigned permissions (permissions not linked to any permission group).
 */
async function getUnassignedPermissions(req, res) {
    const query = `
        SELECT 
            COUNT(p.permission_id) AS unassigned_permissions_count
        FROM 
            permissions p
        LEFT JOIN 
            permission_groups_permissions ppg ON p.permission_id = ppg.permission_id
        WHERE 
            ppg.group_id IS NULL;
    `;
    const connection = await projectDB();
    const result = await executeQuery( query, [], connection);
    return result;

}

/**
 * Query 5: Count of active users.
 */
async function getActiveUsers(req, res) {
    const query = `
        SELECT 
            COUNT(*) AS active_users_count
        FROM 
            users
        WHERE 
            status = 'active';
    `;
    const connection = await projectDB();
    const result = await executeQuery( query, [], connection);
    return result;

}

/**
 * Query 6: Count of inactive users.
 */
async function getInactiveUsers(req, res) {
    const query = `
        SELECT 
            COUNT(*) AS inactive_users_count
        FROM 
            users
        WHERE 
            status = 'inactive';
    `;
    const connection = await projectDB();
    const result = await executeQuery( query, [], connection);
    return result;
}

/**
 * Query 7: Count of records for all tables in 'securitydb' schema.
 * If 'securitydb' is not part of your current schema, adjust accordingly.
 */
async function getSecurityDbTableCounts(req, res) {
    const query = `
        SELECT 
            table_name, 
            table_rows AS record_count
        FROM 
            information_schema.tables
        WHERE 
            table_schema = 'securitydb';
    `;
    const connection = await projectDB();
    const result = await executeQuery( query, [], connection);
    return result;

}

/**
 * Query 8: Count of users in each permission group.
 */
async function getUsersPerPermissionGroup(req, res) {
    const query = `
        SELECT 
            pg.permission_group_id AS permissiongroup_id,
            pg.group_name AS permissiongroup_name,
            COUNT(DISTINCT urdd.user_id) AS user_count
        FROM 
            permission_groups pg
        LEFT JOIN 
            permission_groups_permissions ppg ON pg.permission_group_id = ppg.group_id
        LEFT JOIN 
            user_role_designation_permissions urdp ON ppg.permission_id = urdp.permission_id
        LEFT JOIN 
            user_roles_designations_department urdd ON urdp.user_role_designation_department_id = urdd.user_role_designation_department_id
        GROUP BY 
            pg.permission_group_id, pg.group_name;
    `;
    const connection = await projectDB();

    const result = await executeQuery( query, [], connection);
    return result;
}

async function getSecurityLogData(req, res) {
    const query = `
        SELECT status, COUNT(*) AS entryCount
        FROM security_log
        GROUP BY status;
    `;
    const connection = await securityDB();


    const result = await executeQuery( query, [], connection);
    return result;

}
async function getCrashLogData(req, res) {
    const query = `
        SELECT status, COUNT(*) AS entryCount
        FROM crash_log
        GROUP BY status;

    `;
    const connection = await securityDB();


    const result = await executeQuery( query, [], connection);
    return result;

}

async function getEventLogData(req, res) {
    const query = `
        SELECT status, COUNT(*) AS entryCount
        FROM email_log
        GROUP BY status;

    `;
    const connection = await securityDB();
    const result = await executeQuery( query, [], connection);
    return result;

}

async function getErrorLogData(req, res) {
    const query = `
        SELECT status, COUNT(*) AS entryCount
        FROM error_log
        GROUP BY status;

    `;
    const connection = await securityDB();
    const result = await executeQuery( query, [], connection);
    return result;

}

/**
 * Function to execute all statistical queries and compile results.
 */
async function executeStatisticsQueries(req, res) {
    const resultsObject = {};
    resultsObject.tableCounts = await getTableCounts(req, res);
    resultsObject.permissionsPerGroup = await getPermissionsPerGroup(req, res);
    resultsObject.overlappingPermissions = await getOverlappingPermissions(req, res);
    resultsObject.unassignedPermissions = await getUnassignedPermissions(req, res);
    resultsObject.activeUsers = await getActiveUsers(req, res);
    resultsObject.inactiveUsers = await getInactiveUsers(req, res);
    resultsObject.securityDbTableCounts = await getSecurityDbTableCounts(req, res);
    resultsObject.usersPerPermissionGroup = await getUsersPerPermissionGroup(req, res);
    resultsObject.securityLog = await getSecurityLogData(req, res);
    resultsObject.eventLog = await getEventLogData(req, res);
    resultsObject.crashLog = await getCrashLogData(req, res);
    resultsObject.errorLog = await getErrorLogData(req, res);
    return resultsObject;
}

module.exports = {
    getTableCounts,
    getPermissionsPerGroup,
    getOverlappingPermissions,
    getUnassignedPermissions,
    getActiveUsers,
    getInactiveUsers,
    getSecurityDbTableCounts,
    getUsersPerPermissionGroup,
    executeStatisticsQueries 
};
