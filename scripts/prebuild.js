#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const buildConfig = require('../build.config.js');

// Get template name from package.json
const packageJson = require('../package.json');
const templateName = packageJson.name.split('/').pop(); // Gets 'template-011' from '@3gal/template-011'

// Path to the API directory
const apiDir = path.join(__dirname, '../src/app/api');
const backupDir = path.join(__dirname, `../.${templateName}-api-backup`);
// Define all page files that need processing
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
const memberDetailFile = path.join(__dirname, '../src/components/sections/member-detail.tsx');

if (buildConfig.isStaticExport) {
  // Remove API routes for static export
  if (fs.existsSync(apiDir)) {
    console.log('Static export mode: Temporarily removing API routes...');
    // Move to backup location outside of src/app
    if (fs.existsSync(backupDir)) {
      fs.rmSync(backupDir, { recursive: true, force: true });
    }
    fs.renameSync(apiDir, backupDir);
  }
  
  // Comment out dynamic exports in all page files
  console.log('Static export mode: Commenting out dynamic exports...');
  pageFiles.forEach(file => {
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      // Only comment out if not already commented
      if (!content.includes("// export const dynamic = 'force-dynamic'")) {
        content = content.replace(
          /export const dynamic = 'force-dynamic';/g,
          "// export const dynamic = 'force-dynamic'; // Commented for static export"
        );
      }
      if (!content.includes("// export const revalidate = 0")) {
        content = content.replace(
          /export const revalidate = 0;/g,
          "// export const revalidate = 0; // Commented for static export"
        );
      }
      
      // For [slug] pages, uncomment generateStaticParams
      if (file.includes('[slug]')) {
        console.log('  Uncommenting generateStaticParams for dynamic route...');
        // Simple approach: just remove // from the beginning of lines in the function
        content = content.replace(
          /\/\/ export async function generateStaticParams\(\) \{[\s\S]*?\/\/ \}/gm,
          (match) => match.replace(/^\/\/ /gm, '')
        );
      }
      
      fs.writeFileSync(file, content, 'utf8');
    }
  });
} else {
  // Restore API routes for dynamic builds
  if (fs.existsSync(backupDir)) {
    console.log('Dynamic mode: Restoring API routes...');
    if (fs.existsSync(apiDir)) {
      fs.rmSync(apiDir, { recursive: true, force: true });
    }
    fs.renameSync(backupDir, apiDir);
  }
  
  // Uncomment dynamic exports in all page files
  console.log('Dynamic mode: Uncommenting dynamic exports...');
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
      
      // For [slug] pages, comment out generateStaticParams
      if (file.includes('[slug]')) {
        console.log('  Commenting generateStaticParams for dynamic route...');
        // Comment out the generateStaticParams function
        content = content.replace(
          /^export async function generateStaticParams\(\) \{[\s\S]*?^\}/gm,
          (match) => match.split('\n').map(line => '// ' + line).join('\n')
        );
      }
      
      fs.writeFileSync(file, content, 'utf8');
    }
  });
}