function getPlatformConfig(platforms, PlatformName, platformIP) {
  let selectedConfig = null;

  for (const platform of platforms) {
    if (
      (platform.supported?.includes(PlatformName) ||
      platform.supported?.includes("*")) &&
      (platform.platformIP?.includes(platformIP) ||
      platform.platformIP?.includes("*") || !platform.platformIP)
    ) {
      selectedConfig = platform.config;
      break; // stop at the first match
    }
  }

  return selectedConfig;
}

module.exports = { getPlatformConfig };