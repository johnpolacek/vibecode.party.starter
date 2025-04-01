"use client"

import { useState } from "react"

interface UploadOptions {
  folder?: string
  maxSize?: number // in bytes
  allowedTypes?: string[]
}

const defaultOptions: UploadOptions = {
  folder: "uploads",
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"],
}

export async function uploadFile(file: File, options: UploadOptions = {}): Promise<string> {
  const { folder = "uploads", maxSize, allowedTypes } = { ...defaultOptions, ...options }

  if (!file) {
    throw new Error("No file provided")
  }

  // Validate file type if allowedTypes is provided
  if (allowedTypes && !allowedTypes.includes(file.type)) {
    throw new Error(`File type not allowed. Please upload one of: ${allowedTypes.join(", ")}`)
  }

  // Validate file size if maxSize is provided
  if (maxSize && file.size > maxSize) {
    throw new Error(`File size exceeds ${Math.round(maxSize / (1024 * 1024))}MB limit`)
  }

  const formData = new FormData()
  formData.append("file", file)
  formData.append("folder", folder)

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || "Failed to upload file")
    }

    const data = await response.json()
    return data.url
  } catch (error) {
    console.error("Error uploading file:", error)
    throw error
  }
}

export function useFileUpload(options: UploadOptions = {}) {
  const [isUploading, setIsUploading] = useState(false)

  const upload = async (file: File): Promise<string> => {
    setIsUploading(true)
    try {
      const url = await uploadFile(file, options)
      return url
    } finally {
      setIsUploading(false)
    }
  }

  return {
    upload,
    isUploading,
  }
} 