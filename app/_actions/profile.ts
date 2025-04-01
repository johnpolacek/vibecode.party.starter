"use server"

import { clerkClient } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

interface Link {
  label: string
  url: string
}

interface UpdateProfileData {
  firstName: string
  lastName: string
  bio: string
  website?: string
  twitter?: string
  github?: string
  customLinks?: Link[]
}

export async function updateProfile(userId: string, data: UpdateProfileData) {
  try {
    const client = await clerkClient()
    await client.users.updateUser(userId, {
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      unsafeMetadata: {
        bio: data.bio || "",
        website: data.website || "",
        twitter: data.twitter || "",
        github: data.github || "",
        customLinks: data.customLinks || [],
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error updating profile:", error)
    return { success: false, error: "Failed to update profile" }
  }
}

export async function refreshProfile(path: string) {
  revalidatePath(path)
} 