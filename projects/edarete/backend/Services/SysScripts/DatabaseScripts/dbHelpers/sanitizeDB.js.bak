const { closePool } = require('../../../Database/projectDb.js');

(async () => {
  await require('./dropMDK.js')();
  await require('./dropMDC.js')();

  await require('./addMDK.js')();
  await require('./addAI.js')();
  await require('./addUnique.js')();
  await closePool();
})();
