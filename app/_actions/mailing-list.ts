"use server"

import { auth } from "@clerk/nextjs/server"
import { MailingListPreferences } from "@/types/mailing-list"
import sgMail from "@sendgrid/mail"
import { revalidatePath } from "next/cache"
import { addDoc, getDocs, updateDoc } from "@/lib/firebase/utils"
import { MailingListSubscription } from "@/types/firebase"
import { Timestamp } from "firebase-admin/firestore"

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
  user_id: string
  email: string
  name: string | null
  preferences: MailingListPreferences
}) {
  try {
    // First try to find any existing subscription for this user or email
    const existingResult = await getDocs<MailingListSubscription>(
      'mailing_list_subscriptions',
      [
        {
          field: 'email',
          operator: '==',
          value: data.email
        }
      ]
    )

    const existingSub = existingResult.success && existingResult.data?.[0]

    if (existingSub) {
      // Update existing subscription
      const result = await updateDoc<MailingListSubscription>(
        'mailing_list_subscriptions',
        existingSub.id,
        {
          user_id: data.user_id,
          email: data.email,
          name: data.name,
          preferences: data.preferences,
          subscribed_at: Timestamp.now(),
          unsubscribed_at: null,
        }
      )

      if (!result.success) throw new Error(result.error)
    } else {
      // Insert new subscription
      const result = await addDoc<MailingListSubscription>(
        'mailing_list_subscriptions',
        {
          user_id: data.user_id,
          email: data.email,
          name: data.name,
          preferences: data.preferences,
          subscribed_at: Timestamp.now(),
          unsubscribed_at: null,
        }
      )

      if (!result.success) throw new Error(result.error)
    }
    
    revalidatePath("/mailing-list")
    return { 
      success: true,
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

export async function unsubscribe(userId: string) {
  try {
    // Find the subscription for this user
    const existingResult = await getDocs<MailingListSubscription>(
      'mailing_list_subscriptions',
      [
        {
          field: 'user_id',
          operator: '==',
          value: userId
        }
      ]
    )

    if (!existingResult.success || !existingResult.data?.[0]) {
      throw new Error('Subscription not found')
    }

    const result = await updateDoc<MailingListSubscription>(
      'mailing_list_subscriptions',
      existingResult.data[0].id,
      {
        unsubscribed_at: Timestamp.now()
      }
    )

    if (!result.success) throw new Error(result.error)
    
    revalidatePath("/mailing-list")
    return { 
      success: true,
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
    // Get current user's subscription
    const { userId } = await auth()
    if (!userId) throw new Error('Not authenticated')

    const existingResult = await getDocs<MailingListSubscription>(
      'mailing_list_subscriptions',
      [
        {
          field: 'user_id',
          operator: '==',
          value: userId
        },
        {
          field: 'unsubscribed_at',
          operator: '==',
          value: null
        }
      ]
    )

    if (!existingResult.success || !existingResult.data?.[0]) {
      throw new Error('Active subscription not found')
    }

    const result = await updateDoc<MailingListSubscription>(
      'mailing_list_subscriptions',
      existingResult.data[0].id,
      {
        preferences
      }
    )

    if (!result.success) throw new Error(result.error)
    
    revalidatePath("/mailing-list")
    return { 
      success: true,
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

    const result = await getDocs<MailingListSubscription>(
      'mailing_list_subscriptions',
      [
        {
          field: 'user_id',
          operator: '==',
          value: userId
        }
      ]
    )

    if (!result.success) {
      throw new Error(result.error)
    }

    return {
      success: true as const,
      data: result.data?.[0] || null,
    }
  } catch (error) {
    console.error("Error in getSubscription:", error)
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Failed to get subscription",
    }
  }
} 