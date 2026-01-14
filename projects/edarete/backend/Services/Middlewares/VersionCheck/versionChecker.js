const LogError = require('../../Integrations/Database/Errorlog');
require('dotenv').config();

// Function for handling version checking
const handleVersionChecking = async (req,  object) => {
    let { step } =  req.query;
    step = step ? parseInt(step) - 1 : 0; // Set step to 0 if not provided  
    let { version } = req.query || '0';


    version = parseFloat(version);
    const versionData = object.versions.versionData;

    let selectedVersion = null;


    for (let v of versionData) {
      const versionKey = Object.keys(v)[0];
      const [start, end] = versionKey.split('&').map(str => str.trim());

      let satisfiesCondition = false;
      if (start.includes('>') && start.includes('<')) {
        const [lower, upper] = start.includes('>=') ? [parseFloat(start.slice(2)), parseFloat(end.slice(1))] : [parseFloat(start.slice(1)), parseFloat(end.slice(1))];
        satisfiesCondition = (version >= lower && version < upper);
      } else if (start.includes('>')) {
        satisfiesCondition = start.includes('=') ? version >= parseFloat(start.slice(2)) : version > parseFloat(start.slice(1));
      } else if (start.includes('<')) {
        satisfiesCondition = start.includes('=') ? version <= parseFloat(start.slice(2)) : version < parseFloat(start.slice(1));
      } else if (start.includes('=')) {
        satisfiesCondition = version === parseFloat(start.slice(1));
      }
      else if(start.includes('*')){
        satisfiesCondition = true
      }
      if (satisfiesCondition) {
        selectedVersion = v[versionKey];
        break;
      }
    }

    if (!selectedVersion) {
      throw new Error("Matching version configuration not found for version specified")
    }
    const { data, response } = selectedVersion.steps[step];
    return {
      platform: selectedVersion.steps[step]?.platform,
      data,
      response,
      config: selectedVersion.steps[step]?.config
    }
  
};

module.exports = handleVersionChecking;
