import { S3Client } from "@aws-sdk/client-s3"

// Environment variables
const awsConfig = {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  bucketPublic: process.env.AWS_BUCKET_PUBLIC,
  cloudfrontDomain: process.env.CLOUDFRONT_DOMAIN,
}

export const AWS_BUCKET_PUBLIC = process.env.AWS_BUCKET_PUBLIC

// Log missing variables in development only
if (process.env.NODE_ENV === 'development') {
  const missingVars = Object.entries(awsConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key)

  if (missingVars.length > 0) {
    console.warn('Missing AWS configuration variables:', missingVars)
  }
}

// Function to check if AWS is configured
export function isAwsConfigured(): boolean {
  return Boolean(
    awsConfig.region &&
    awsConfig.accessKeyId &&
    awsConfig.secretAccessKey &&
    awsConfig.bucketPublic
  )
}

// Create an S3 client if configured
export const s3Client = isAwsConfigured()
  ? new S3Client({
      region: awsConfig.region!,
      credentials: {
        accessKeyId: awsConfig.accessKeyId!,
        secretAccessKey: awsConfig.secretAccessKey!,
      },
    })
  : null

// Function to get asset URL
export function getAssetUrl(key: string, withTimestamp = false): string | null {
  if (!isAwsConfigured()) {
    return null
  }

  const timestamp = withTimestamp ? Date.now() : null
  const keyWithTimestamp = timestamp 
    ? (key.includes('?') ? `${key}&t=${timestamp}` : `${key}?t=${timestamp}`)
    : key

  if (awsConfig.cloudfrontDomain) {
    return `https://${awsConfig.cloudfrontDomain}/${keyWithTimestamp}`
  }

  // Fallback to direct S3 URL
  return `https://${awsConfig.bucketPublic}.s3.${awsConfig.region}.amazonaws.com/${keyWithTimestamp}`
}

// Function to check AWS connection
export async function checkAwsConnection(): Promise<{
  success: boolean
  message: string
  details?: {
    error?: unknown
  }
}> {
  if (!isAwsConfigured()) {
    return {
      success: false,
      message: 'AWS is not configured',
      details: {
        error: 'Missing required environment variables'
      }
    }
  }

  try {
    // Try to make a simple API call to verify connection
    await s3Client!.config.credentials()
    
    return {
      success: true,
      message: 'Successfully connected to AWS'
    }
  } catch (err) {
    console.error('Unexpected error checking AWS connection:', err)
    return {
      success: false,
      message: `Unexpected error: ${err instanceof Error ? err.message : String(err)}`,
      details: { error: err }
    }
  }
} 