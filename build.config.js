// Build configuration
// Set BUILD_MODE environment variable to control the build type
// BUILD_MODE=static for static export (for iframe embedding)
// BUILD_MODE=standalone for Docker deployment (default)

const BUILD_MODE = process.env.BUILD_MODE || 'standalone';

module.exports = {
  BUILD_MODE,
  isStaticExport: BUILD_MODE === 'static',
  isStandalone: BUILD_MODE === 'standalone'
};