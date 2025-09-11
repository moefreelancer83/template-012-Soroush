# Template Build Modes & Setup Guide

This guide explains how to prepare a Next.js template from a designer for both static (iframe) and standalone (Docker) deployment.

## Table of Contents

1. [Initial Template Setup](#initial-template-setup)
2. [Build Modes](#build-modes)
3. [Required Files & Structure](#required-files--structure)
4. [Content Management](#content-management)
5. [Image & Asset Handling](#image--asset-handling)
6. [Navigation Configuration](#navigation-configuration)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

## Initial Template Setup

When you receive a Next.js template from a designer, follow these steps:

### 1. Verify Project Structure

Ensure the template has the standard Next.js App Router structure:
```
template-xxx/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── (other pages)/
│   └── components/
├── public/
├── package.json
├── next.config.ts
└── tsconfig.json
```

### 2. Install Build System Files

Copy these files from an existing template (like template-011):

```bash
# Essential build files
├── build.config.js
├── scripts/
│   ├── prebuild.js
│   └── postbuild.js
├── BUILD_MODES.md (this file)
```

### 3. Update package.json Scripts

Add these scripts to your package.json:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:static": "BUILD_MODE=static node scripts/prebuild.js && BUILD_MODE=static next build && BUILD_MODE=static node scripts/postbuild.js",
    "build:standalone": "BUILD_MODE=standalone pnpm run build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 4. Configure next.config.ts

Replace the existing next.config.ts with this dynamic configuration:

```typescript
import type { NextConfig } from "next";
const buildConfig = require('./build.config.js');

const nextConfig: NextConfig = buildConfig.isStaticExport ? {
  // Static export configuration (for iframe embedding)
  output: "export",
  basePath: "/template-xxx", // Replace xxx with your template number
  assetPrefix: "/template-xxx",
  trailingSlash: true,
  images: {
    domains: ["3gal-landing-users-contents-905418306576.s3.amazonaws.com"],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
} : {
  // Standalone configuration (for Docker deployment)
  output: 'standalone',
  trailingSlash: false,
  images: {
    domains: ['3gal-landing-users-contents-905418306576.s3.amazonaws.com'],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
```

### 5. Set Development Port

In package.json, update the dev script with a unique port:

```json
"dev": "next dev -p 30XX", // XX = template number
```

## Build Modes

### 1. Static Export Mode (for iframe embedding)

```bash
pnpm run build:static
```

This mode:
- Generates static HTML files with `output: 'export'`
- Uses `/template-xxx` as base path for all routes
- Temporarily removes API routes (not supported in static export)
- Comments out `force-dynamic` directives
- Outputs files to `out/` directory
- Requires manual deployment to landing-client

### 2. Standalone Mode (for Docker deployment)

```bash
pnpm run build:standalone
```

This mode:
- Builds with `output: 'standalone'` for optimized Docker deployment
- Keeps API routes (like `/api/health`)
- Enables dynamic rendering with `force-dynamic`
- Supports runtime S3 content loading

## Required Files & Structure

### 1. Template Loader Service

Create `src/services/templateLoader.ts`:

```typescript
import { promises as fs } from 'fs';
import path from 'path';

export async function loadTemplate() {
  // For now, load from local file
  const templatePath = path.join(process.cwd(), 'src/data/template.json');
  const fileContent = await fs.readFile(templatePath, 'utf8');
  const template = JSON.parse(fileContent);
  
  console.log('Loading template from local file');
  return template;
}
```

### 2. Template Data File

Create `src/data/template.json` with centralized content:

```json
{
  "templateId": "template_xxx",
  "userId": "user_001",
  "metadata": {
    "templateName": "Template Name",
    "version": "1.0.0"
  },
  "content": {
    "hero": {
      "title": "Your Title",
      "subtitle": "Your Subtitle"
    },
    // Add all page content here
  }
}
```

### 3. API Health Endpoint

Create `src/app/api/health/route.ts` for standalone deployment:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'template-xxx'
  });
}
```

### 4. Navigation Provider (for static exports)

Create `src/components/NavigationProvider.tsx`:

```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href.includes(window.location.origin)) {
        e.preventDefault();
        const path = link.href.replace(window.location.origin, '');
        router.push(path);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [router]);

  return <>{children}</>;
}
```

## Content Management

### 1. Dynamic vs Static Content

- **Dynamic Content**: Store in `template.json` for easy updates
- **Static Content**: Legal pages, privacy policies can be in template.json too

### 2. Multi-language Support

Structure your template.json for multiple languages:

```json
{
  "content": {
    "de": {
      "hero": { "title": "Willkommen" }
    },
    "en": {
      "hero": { "title": "Welcome" }
    }
  }
}
```

## Image & Asset Handling

### 1. Public Folder Structure

For static builds, organize images with the template prefix:

```
public/
├── template-xxx/      # Create this for static builds
│   └── images/
│       └── team/
│           └── photo.jpg
```

### 2. Image URLs in template.json

Use paths that include the template prefix:

```json
{
  "team": {
    "members": [{
      "imageUrl": "/template-xxx/images/team/photo.jpg"
    }]
  }
}
```

### 3. Copy Script Integration

After building static, use the copy script:

```bash
# Build static version
pnpm run build:static

# Copy to landing-client
../../scripts/copy-template-to-landing-client.sh template-xxx
```

## Navigation Configuration

### 1. For Multi-page Templates

Ensure all internal links work in static export:

```typescript
// In layout.tsx
import { NavigationProvider } from '@/components/NavigationProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <NavigationProvider>
          {children}
        </NavigationProvider>
      </body>
    </html>
  );
}
```

### 2. Update Links

Use Next.js Link component or ensure proper href structure:

```tsx
// Good for static export
<Link href="/impressum">Impressum</Link>

// Will be converted to
<a href="/template-xxx/impressum/">Impressum</a>
```

## Deployment

### 1. Static Deployment (Landing Client)

```bash
# 1. Build static version
cd templates/template-xxx
pnpm run build:static

# 2. Copy to landing-client
cd ../..
./scripts/copy-template-to-landing-client.sh template-xxx

# 3. Template available at
http://localhost:3000/template-showcase/template-xxx
```

### 2. Docker Deployment

```bash
# 1. Build Docker image
./scripts/templates/build-template.sh template-xxx

# 2. Test locally
docker run -p 3000:3000 3gal-landing-templates:template_xxx

# 3. Push to ECR
./scripts/templates/push-to-ecr.sh template-xxx
```

## Troubleshooting

### Common Issues

1. **Images not showing in static build**
   - Ensure images are in `public/template-xxx/images/`
   - Use absolute paths with template prefix in template.json

2. **Navigation not working in static export**
   - Add NavigationProvider to layout
   - Set `trailingSlash: true` in next.config.ts

3. **Build errors with dynamic exports**
   - Remove or comment out `export const dynamic = 'force-dynamic'`
   - Use the prebuild/postbuild scripts

4. **API routes in static build**
   - API routes are automatically removed during static build
   - They're restored after build completion

### Validation Checklist

Before deploying, ensure:

- [ ] Template builds successfully in both modes
- [ ] Images display correctly in static build
- [ ] Navigation works between pages
- [ ] Content is loaded from template.json
- [ ] Health endpoint exists for standalone mode
- [ ] Unique port set for development
- [ ] No hardcoded sensitive data

## Notes

- The build system automatically handles file modifications during builds
- API routes are backed up to `.template-xxx-api-backup/` during static builds
- Both modes use the same source code for easier maintenance
- Always test both build modes before final deployment