"use server"

import { verifyUnsubscribeToken, decodeEmail } from "@/lib/email-utils"
import { supabaseAdmin } from "@/lib/supabase"
import { clerkClient } from "@clerk/nextjs/server"

export async function unsubscribeFromNotifications(token: string, encodedEmail: string) {
  try {
    // Decode email
    const email = decodeEmail(encodedEmail)
    console.log("Attempting to unsubscribe email:", email)

    // Verify token
    if (!verifyUnsubscribeToken(email, token)) {
      console.log("Token verification failed")
      return {
        success: false,
        error: "Invalid or expired unsubscribe link"
      }
    }

    // Get Clerk users with this email
    const client = await clerkClient()
    const { data: users } = await client.users.getUserList({
      emailAddress: [email],
    })
    console.log("Found users:", users?.length)

    if (!users?.length) {
      console.log("No users found with email:", email)
      return {
        success: false,
        error: "No user found with this email address"
      }
    }

    // Update all hackathon participations for these users
    const userIds = users.map(user => user.id)
    console.log("Updating notifications for user IDs:", userIds)

    const { error } = await supabaseAdmin
      .from("hackathon_participants")
      .update({ notifications_enabled: false })
      .in("user_id", userIds)

    if (error) {
      console.error("Supabase update error:", error)
      throw error
    }

    console.log("Successfully unsubscribed users")
    return {
      success: true,
      message: "Successfully unsubscribed from all hackathon notifications"
    }
  } catch (error) {
    console.error("Error unsubscribing from notifications:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to unsubscribe from notifications"
    }
  }
} 