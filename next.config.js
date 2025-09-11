const buildConfig = require('./build.config.js');

const nextConfig = buildConfig.isStaticExport
  ? {
      // Static export configuration (for iframe embedding)
      output: "export",
      basePath: "/template-012",
      assetPrefix: "/template-012",
      trailingSlash: true,
      images: {
        domains: ["3gal-landing-users-contents-905418306576.s3.amazonaws.com"],
        unoptimized: true,
      },
      eslint: {
        ignoreDuringBuilds: false,
      },
    }
  : {
      // Standalone configuration (for Docker deployment)
      output: "standalone",
      trailingSlash: false,
      images: {
        domains: ["3gal-landing-users-contents-905418306576.s3.amazonaws.com"],
        unoptimized: true,
      },
      eslint: {
        ignoreDuringBuilds: false,
      },
    };

module.exports = nextConfig;
