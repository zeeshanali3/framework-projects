const databaseAbstraction = require("./databaseAbstraction");





const securityDB = async () => {


  // return a new connection from the pool
  const connection = await databaseAbstraction.getSecurityConnection();
  return connection;
};

const closePool = async () => {
  await databaseAbstraction.closePool(pool)
}

module.exports = {securityDB, closePool};





