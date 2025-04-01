import { NextRequest, NextResponse } from "next/server"
import { uploadFileToS3 } from "@/lib/s3-utils"
import { v4 as uuidv4 } from "uuid"
import { auth } from "@clerk/nextjs/server"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = formData.get("folder") as string || "images"
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }
    
    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "File type not allowed. Please upload an image (JPEG, PNG, WebP, SVG, or GIF)." }, { status: 400 })
    }
    
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File size exceeds 5MB limit" }, { status: 400 })
    }
    
    // Generate a unique filename
    const fileExtension = file.name.split(".").pop()
    const fileName = `${folder}/${uuidv4()}.${fileExtension}`
    
    // Upload to S3
    const fileUrl = await uploadFileToS3(file, fileName)
    
    // Log the URL for debugging
    console.log("Uploaded file URL:", fileUrl)
    
    return NextResponse.json({ url: fileUrl })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
} 