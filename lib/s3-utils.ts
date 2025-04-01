import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

// Configure S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "",
  credentials: {
    accessKeyId: process.env.AWS_KEY || "",
    secretAccessKey: process.env.AWS_SECRET || "",
  },
})

// CloudFront domain for serving assets
const CLOUDFRONT_DOMAIN = process.env.CLOUDFRONT_DOMAIN
const AWS_BUCKET_PUBLIC = process.env.AWS_BUCKET_PUBLIC
const AWS_REGION = process.env.AWS_REGION

/**
 * Get the URL for an S3 object, using CloudFront if configured
 * @param key The S3 object key
 * @param withTimestamp Whether to append a timestamp for cache busting
 * @returns The URL of the file
 */
function getAssetUrl(key: string, withTimestamp = false): string {
  const timestamp = withTimestamp ? Date.now() : null
  const keyWithTimestamp = timestamp 
    ? (key.includes('?') ? `${key}&t=${timestamp}` : `${key}?t=${timestamp}`)
    : key

  if (CLOUDFRONT_DOMAIN) {
    return `https://${CLOUDFRONT_DOMAIN}/${keyWithTimestamp}`
  }

  // Log warning about missing CloudFront configuration
  console.warn('CLOUDFRONT_DOMAIN not configured - falling back to direct S3 URL. Configure CLOUDFRONT_DOMAIN for better performance.')
  
  // Fallback to direct S3 URL
  return `https://${AWS_BUCKET_PUBLIC}.s3.${AWS_REGION}.amazonaws.com/${keyWithTimestamp}`
}

/**
 * Upload a file to S3
 * @param file The file to upload
 * @param key The S3 object key (path + filename)
 * @param bucketName The S3 bucket name
 * @param contentType Optional content type
 * @returns The URL of the uploaded file through CloudFront
 */
export async function uploadFileToS3(
  file: File | Blob,
  key: string,
  contentType?: string
): Promise<string> {
  // Convert file to buffer
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // Set up the upload parameters
  const params = {
    Bucket: AWS_BUCKET_PUBLIC,
    Key: key, // Original key for S3
    Body: buffer,
    ContentType: contentType || file.type,
    CacheControl: key.includes('hackathon/covers') ? 'no-cache' : "public, max-age=31536000", // No cache for hackathon covers
  }

  // Upload to S3
  await s3Client.send(new PutObjectCommand(params))
  
  // Get the URL (with timestamp for cache busting)
  const url = getAssetUrl(key, true)
  console.log("Generated asset URL:", url)
  
  return url
}

export const transferImageToS3 = async (imageUrl: string, key: string): Promise<string> => {
  try {
    // Download the image from the URL
    console.log("Downloading image from URL:", imageUrl)
    const response = await fetch(imageUrl)
    console.log("Image downloaded successfully")
    const arrayBuffer = await response.arrayBuffer()

    // Prepare the parameters for uploading to S3
    const params = {
      Bucket: AWS_BUCKET_PUBLIC,
      Key: key,
      Body: Buffer.from(arrayBuffer),
      ContentType: response.headers.get("content-type") || "application/octet-stream",
      ContentLength: parseInt(response.headers.get("content-length") || "0", 10),
    }

    console.log("Prepare for upload to S3")

    // Upload the image to the S3 bucket
    const putCommand = new PutObjectCommand(params)

    console.log("Sending PutObjectCommand to S3...")
    await s3Client.send(putCommand)

    console.log("Upload complete")

    // Get the URL
    const publicUrl = getAssetUrl(key)
    console.log("Image uploaded successfully:", publicUrl)
    return publicUrl
  } catch (error) {
    throw new Error("Error uploading image to S3" + error)
  }
}