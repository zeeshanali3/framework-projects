
const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution");

async function total_count(req, completeQuery,connection){
   
    const query = `
        SELECT
            COUNT(*) as count
        FROM 
            ${await getTableName(completeQuery)}
        WHERE  status != 'inactive'
    `
   
    const results = await executeQuery(query, "");
    return results[0]?.count
}
function getTableName(query) {
    // Regular expression to match the table name after "FROM"
    const match = query.match(/FROM\s+(\w+)/i);
    return match ? match[1] : null; // Return the table name or null if not found
}
module.exports = total_count;