"use server"

import { auth } from "@clerk/nextjs/server"
import { MailingListPreferences } from "@/types/mailing-list"
import sgMail from "@sendgrid/mail"
import { revalidatePath } from "next/cache"
import {
  addMailingListSubscription,
  removeMailingListSubscription,
  updateMailingListPreferences,
  getMailingListSubscriptions
} from "@/lib/services/mailing-list"

// Configure SendGrid and track availability
let isEmailServiceConfigured = false

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  isEmailServiceConfigured = true
} else {
  console.warn("SENDGRID_API_KEY not found. Email service will be disabled.")
}

// Helper to check if email service is available
function isEmailServiceAvailable() {
  return isEmailServiceConfigured
}

export async function subscribe(data: {
  userId: string
  email: string
  name: string | null
  preferences: MailingListPreferences
}) {
  try {
    const result = await addMailingListSubscription({
      ...data,
      name: data.name ?? undefined,
    })
    revalidatePath("/mailing-list")
    return {
      success: !!result,
      emailServiceAvailable: isEmailServiceAvailable()
    }
  } catch (error) {
    console.error("Error in subscribe:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to subscribe",
      emailServiceAvailable: isEmailServiceAvailable()
    }
  }
}

export async function unsubscribe(email: string) {
  try {
    const result = await removeMailingListSubscription(email)
    revalidatePath("/mailing-list")
    return {
      success: result,
      emailServiceAvailable: isEmailServiceAvailable()
    }
  } catch (error) {
    console.error("Error in unsubscribe:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to unsubscribe",
      emailServiceAvailable: isEmailServiceAvailable()
    }
  }
}

export async function updatePreferences({ preferences }: { preferences: MailingListPreferences }) {
  try {
    const { userId } = await auth()
    if (!userId) throw new Error('Not authenticated')
    const result = await updateMailingListPreferences(userId, preferences)
    revalidatePath("/mailing-list")
    return {
      success: result,
      emailServiceAvailable: isEmailServiceAvailable()
    }
  } catch (error) {
    console.error("Error in updatePreferences:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update preferences",
      emailServiceAvailable: isEmailServiceAvailable()
    }
  }
}

export async function getSubscription() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return {
        success: true as const,
        data: null,
      }
    }
    const subscriptions = await getMailingListSubscriptions()
    const sub = subscriptions.find(s => s.userId === userId && s.unsubscribedAt === null)
    return {
      success: true as const,
      data: sub || null,
    }
  } catch (error) {
    console.error("Error in getSubscription:", error)
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Failed to get subscription",
    }
  }
} 