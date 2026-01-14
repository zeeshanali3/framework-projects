const logMessage = require("../../SysFunctions/LogFunctions/consoleLog.js");
const MySQLDatabase = require('./implementations/MySQLDatabase');
const MySQL2Database = require('./implementations/MySQL2Database');
const PostgreSQLDatabase = require('./implementations/PostgreSQLDatabase');

class DatabaseFactory {
  static getBaseConfig(databaseType) {
    const isSecurity = databaseType === 'security';
    const prefix = isSecurity ? 'SECURITY_DB_' : 'DB_';

    logMessage([{
      host: process.env[`${prefix}HOST`],
      user: process.env[`${prefix}USER`],
      password: process.env[`${prefix}PW`],
      database: process.env[`${prefix}DATABASE`],
      port: process.env[`${prefix}PORT`],
    }]);

    
    return {
      host: process.env[`${prefix}HOST`],
      user: process.env[`${prefix}USER`],
      password: process.env[`${prefix}PW`],
      database: process.env[`${prefix}DATABASE`],
      port: process.env[`${prefix}PORT`]
    };


  

  }

  static createDatabase(dbType, databaseType = 'main') {
    const config = this.getBaseConfig(databaseType);
    switch ((dbType || '').toLowerCase()) {
      case 'mysql':
        return new MySQLDatabase(config);
      case 'mysql2':
        return new MySQL2Database(config);
      case 'postgres':
      case 'postgresql':
        return new PostgreSQLDatabase(config);
      default:
        throw new Error(`Unsupported database type: ${dbType}`);
    }
  }

  static getSupportedDatabaseTypes() {
    return ['mysql', 'mysql2', 'postgres', 'postgresql'];
  }
}

module.exports = DatabaseFactory;


