const logMessage = require('../../SysFunctions/LogFunctions/consoleLog');
const db = require('./databaseAbstraction');

let pool;

const projectDB = async () => {
  if (!db.initialized) {
    db.initialize();
    logMessage(['🟢 Database initialized']);
  }

  if (!pool) {
    pool = db.createPool('main');
    logMessage(['✅ Connection pool created']);
  }

  const connection = await db.getConnection(pool);

  // Log approximate pool status if available
  try {
    const all = pool._allConnections?.length || 0;
    const free = pool._freeConnections?.length || 0;
    const queue = pool._connectionQueue?.length || 0;

    logMessage([
      '📊 Pool Status:',
      `• Total Connections: ${all}`,
      `• Free Connections: ${free}`,
      `• Queue Size: ${queue}`,
    ], true);
  } catch (err) {
    logMessage(['⚠️ Unable to read pool status:', err.message], true);
    throw new Error(`Pool Status Error: ${err.message}`);
  }

  return connection;
};

const closePool = async () => {
  if (pool) {
    await db.closePool(pool);
    logMessage(['❎ Connection pool closed'], true);
    pool = null;
  }
};

module.exports = { projectDB, closePool };
