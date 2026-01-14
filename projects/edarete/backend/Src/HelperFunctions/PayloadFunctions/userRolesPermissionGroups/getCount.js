const {projectDB} = require("../../../../Services/Integrations/Database/projectDb");
const { executeQuery } = require("../../../../Services/Integrations/Database/queryExecution");

async function total_count(req, res){
    const query = `
        SELECT
            COUNT(*) as count
        FROM 
            userrolespermissiongroups
    `
    const connection = await projectDB(); 
    const results = await executeQuery(query, "", connection);
    return results[0]?.count
}

module.exports = {total_count};