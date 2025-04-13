"use server"

import { auth } from "@clerk/nextjs/server"
import { supabaseAdmin } from "@/lib/supabase-admin"
import { MailingListPreferences } from "@/types/mailing-list"
import sgMail from "@sendgrid/mail"
import { Database } from "@/types/supabase"
import { revalidatePath } from "next/cache"

// Configure SendGrid
if (!process.env.SENDGRID_API_KEY) {
  throw new Error("Missing SENDGRID_API_KEY environment variable")
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

type MailingListSubscription = Database["public"]["Tables"]["mailing_list_subscriptions"]["Row"]

export async function subscribe(data: {
  user_id: string
  email: string
  name: string | null
  preferences: MailingListPreferences
}) {
  // First try to update any existing subscription for this user or email
  const { data: existingSub } = await supabaseAdmin
    .from("mailing_list_subscriptions")
    .select()
    .or(`user_id.eq.${data.user_id},email.eq.${data.email}`)
    .maybeSingle()

  if (existingSub) {
    // Update existing subscription
    const { error } = await supabaseAdmin
      .from("mailing_list_subscriptions")
      .update({
        user_id: data.user_id,
        email: data.email,
        name: data.name,
        preferences: data.preferences,
        subscribed_at: new Date().toISOString(),
        unsubscribed_at: null,
      })
      .eq('id', existingSub.id)

    if (error) throw error
  } else {
    // Insert new subscription
    const { error } = await supabaseAdmin
      .from("mailing_list_subscriptions")
      .insert({
        user_id: data.user_id,
        email: data.email,
        name: data.name,
        preferences: data.preferences,
        subscribed_at: new Date().toISOString(),
      })

    if (error) throw error
  }
  
  revalidatePath("/mailing-list")
  return { success: true }
}

export async function unsubscribe(userId: string) {
  const { error } = await supabaseAdmin
    .from("mailing_list_subscriptions")
    .update({
      unsubscribed_at: new Date().toISOString(),
    })
    .eq("user_id", userId)

  if (error) throw error
  
  revalidatePath("/mailing-list")
  return { success: true }
}

export async function updatePreferences({ preferences }: { preferences: MailingListPreferences }) {
  const { error } = await supabaseAdmin
    .from("mailing_list_subscriptions")
    .update({
      preferences,
    })
    .is("unsubscribed_at", null)

  if (error) throw error
  
  revalidatePath("/mailing-list")
  return { success: true }
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

    const { data: subscription, error } = await supabaseAdmin
      .from("mailing_list_subscriptions")
      .select()
      .eq("user_id", userId)
      .maybeSingle()

    if (error) {
      throw error
    }

    return {
      success: true as const,
      data: subscription as MailingListSubscription | null,
    }
  } catch (error) {
    console.error("Error in getSubscription:", error)
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Failed to get subscription",
    }
  }
} 