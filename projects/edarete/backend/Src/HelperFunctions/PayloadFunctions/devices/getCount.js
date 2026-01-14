const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution");

async function total_count(req, res){
    const query = `
        SELECT
            COUNT(*) as count
        FROM 
            user_devices
    `
    const results = await executeQuery(query, "");
    return results[0]?.count
}

module.exports = {total_count};