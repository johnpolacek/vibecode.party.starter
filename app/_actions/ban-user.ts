'use server'

import { auth, clerkClient } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { isAdmin } from "@/lib/auth-utils"

export async function banUser(userId: string, reason?: string) {
  try {
    // Get the current user's ID
    const { userId: adminId } = await auth()
    
    if (!adminId) {
      throw new Error("Not authenticated")
    }

    // Verify the user is an admin
    const isUserAdmin = await isAdmin()
    if (!isUserAdmin) {
      throw new Error("Not authorized")
    }

    // Initialize Clerk client
    const client = await clerkClient()

    // Get current user to check if they're banned
    const user = await client.users.getUser(userId)
    const isBanned = user.banned

    if (isBanned) {
      // Unban the user
      await client.users.unbanUser(userId)
    } else {
      // Ban the user and store reason in metadata
      await client.users.banUser(userId)
      
      // Store the ban reason in metadata if provided
      if (reason) {
        await client.users.updateUser(userId, {
          publicMetadata: {
            ...user.publicMetadata,
            banReason: reason
          }
        })
      }
    }

    // Revalidate the admin users page
    revalidatePath("/admin/users")

    return { success: true }
  } catch (error) {
    console.error("Error managing user ban status:", error)
    return { success: false, error: (error as Error).message }
  }
} 