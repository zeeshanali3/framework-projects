const { closePool } = require('../../../Integrations/Database/securityDB');

(async () => {
  await require("./dropMDK")();
  await require("./dropMDC")();

  await require("./addMDK")();
  await require("./addAI")();
  await require("./addUnique")();
  await closePool();
})();