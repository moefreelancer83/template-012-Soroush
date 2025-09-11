import { promises as fs } from 'fs';
import path from 'path';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

let cachedTemplate: any = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute cache

async function loadFromS3(): Promise<any | null> {
  const bucketName = process.env.S3_BUCKET;
  const userId = process.env.USER_ID;
  const templateId = process.env.TEMPLATE_ID;
  
  if (!bucketName || !userId || !templateId) {
    console.log('Missing S3 configuration, using default template');
    return null;
  }

  const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'eu-central-1',
  });

  const key = `users/${userId}/templates/${templateId}/template.json`;
  
  try {
    console.log(`Loading template from S3: s3://${bucketName}/${key}`);
    
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });
    
    const response = await s3Client.send(command);
    const bodyContents = await response.Body?.transformToString();
    
    if (bodyContents) {
      const s3Template = JSON.parse(bodyContents);
      console.log('Successfully loaded template from S3');
      return s3Template;
    }
  } catch (error) {
    console.error('Error loading template from S3:', error);
    console.log('Falling back to default template');
  }
  
  return null;
}

export async function loadTemplate() {
  // Check build mode - static builds should always use local file
  const buildMode = process.env.BUILD_MODE || 'standalone';
  
  if (buildMode === 'static') {
    // Always load from local file for static builds
    const templatePath = path.join(process.cwd(), 'src/data/template.json');
    const fileContent = await fs.readFile(templatePath, 'utf8');
    const template = JSON.parse(fileContent);
    console.log('Loading template from local file (static mode)');
    // Extract content from wrapper structure
    return template.content || template;
  }

  // In development mode, use local file unless USE_S3 is explicitly set
  if (process.env.NODE_ENV === 'development' && process.env.USE_S3 !== 'true') {
    const templatePath = path.join(process.cwd(), 'src/data/template.json');
    const fileContent = await fs.readFile(templatePath, 'utf8');
    const template = JSON.parse(fileContent);
    console.log('Loading template from local file (development mode)');
    // Extract content from wrapper structure
    return template.content || template;
  }

  // For standalone/production mode, try S3 first if configured
  const bucketName = process.env.S3_BUCKET;
  const userId = process.env.USER_ID;
  const templateId = process.env.TEMPLATE_ID;
  
  if (bucketName && userId && templateId) {
    // Check cache
    const now = Date.now();
    if (cachedTemplate && (now - cacheTimestamp) < CACHE_DURATION) {
      console.log('Using cached template');
      return cachedTemplate;
    }

    // Try to load from S3
    const s3Template = await loadFromS3();
    
    if (s3Template) {
      // Extract content from wrapper structure
      const templateData = s3Template.content || s3Template;
      cachedTemplate = templateData;
      cacheTimestamp = now;
      return templateData;
    }
  }

  // Fallback to local file
  const templatePath = path.join(process.cwd(), 'src/data/template.json');
  const fileContent = await fs.readFile(templatePath, 'utf8');
  const template = JSON.parse(fileContent);
  
  console.log('Loading template from local file (fallback)');
  // Extract content from wrapper structure
  return template.content || template;
}