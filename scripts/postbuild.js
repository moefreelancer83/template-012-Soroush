#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const buildConfig = require('../build.config.js');

// Get template name from package.json
const packageJson = require('../package.json');
const templateName = packageJson.name.split('/').pop();

// Path to the API directory
const apiDir = path.join(__dirname, '../src/app/api');
const backupDir = path.join(__dirname, `../.${templateName}-api-backup`);

// Define all page files that need processing - must match prebuild.js
const pageFiles = [
  path.join(__dirname, '../src/app/page.tsx'),
  path.join(__dirname, '../src/app/about/page.tsx'),
  path.join(__dirname, '../src/app/services/page.tsx'),
  path.join(__dirname, '../src/app/team/page.tsx'),
  path.join(__dirname, '../src/app/team/[slug]/page.tsx'),
  path.join(__dirname, '../src/app/contact/page.tsx'),
  path.join(__dirname, '../src/app/clients/page.tsx'),
  path.join(__dirname, '../src/app/impressum/page.tsx'),
  path.join(__dirname, '../src/app/privacy/page.tsx')
];

if (buildConfig.isStaticExport) {
  // Restore API routes after static build
  if (fs.existsSync(backupDir)) {
    console.log('Restoring API routes after static build...');
    if (fs.existsSync(apiDir)) {
      fs.rmSync(apiDir, { recursive: true, force: true });
    }
    fs.renameSync(backupDir, apiDir);
  }
  
  // Restore dynamic exports in all page files
  console.log('Restoring dynamic exports after static build...');
  pageFiles.forEach(file => {
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      content = content.replace(
        /\/\/ export const dynamic = 'force-dynamic'; \/\/ Commented for static export/g,
        "export const dynamic = 'force-dynamic';"
      );
      content = content.replace(
        /\/\/ export const revalidate = 0; \/\/ Commented for static export/g,
        "export const revalidate = 0;"
      );
      fs.writeFileSync(file, content, 'utf8');
    }
  });
}