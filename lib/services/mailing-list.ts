import { supabaseAdmin } from '@/lib/supabase'
import { toCamelCase } from '@/lib/utils/case-transforms'

// Database types
interface DatabaseMailingListSubscription {
  id: string
  user_id: string
  email: string
  name: string | null
  subscribed_at: string
  unsubscribed_at: string | null
  preferences: {
    marketing: boolean
    updates: boolean
  }
  created_at: string
  updated_at: string
}

// Frontend types
export interface MailingListSubscription {
  id: string
  userId: string
  email: string
  name: string | null
  subscribedAt: string
  unsubscribedAt: string | null
  preferences: {
    marketing: boolean
    updates: boolean
  }
  createdAt: string
  updatedAt: string
}

export interface CreateMailingListSubscription {
  userId: string
  email: string
  name?: string | null
  preferences?: {
    marketing: boolean
    updates: boolean
  }
}

export interface UpdateMailingListSubscription {
  email?: string
  name?: string | null
  unsubscribedAt?: string | null
  preferences?: {
    marketing: boolean
    updates: boolean
  }
}

/**
 * Get all mailing list subscriptions
 */
export async function getMailingListSubscriptions(): Promise<MailingListSubscription[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('mailing_list_subscriptions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return toCamelCase<DatabaseMailingListSubscription[]>(data || []) as unknown as MailingListSubscription[]
  } catch (error) {
    console.error('Error fetching mailing list subscriptions:', error)
    throw new Error('Failed to fetch mailing list subscriptions')
  }
}

/**
 * Get a single mailing list subscription by ID
 */
export async function getMailingListSubscription(id: string): Promise<MailingListSubscription | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('mailing_list_subscriptions')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    if (!data) return null

    return toCamelCase<DatabaseMailingListSubscription>(data) as unknown as MailingListSubscription
  } catch (error) {
    console.error(`Error fetching mailing list subscription ${id}:`, error)
    throw new Error('Failed to fetch mailing list subscription')
  }
}

/**
 * Get a single mailing list subscription by user ID
 */
export async function getMailingListSubscriptionByUserId(userId: string): Promise<MailingListSubscription | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('mailing_list_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) throw error
    if (!data) return null

    return toCamelCase<DatabaseMailingListSubscription>(data) as unknown as MailingListSubscription
  } catch (error) {
    console.error(`Error fetching mailing list subscription for user ${userId}:`, error)
    throw new Error('Failed to fetch mailing list subscription')
  }
}

/**
 * Create a new mailing list subscription
 */
export async function createMailingListSubscription(
  subscription: CreateMailingListSubscription
): Promise<MailingListSubscription> {
  try {
    const { data, error } = await supabaseAdmin
      .from('mailing_list_subscriptions')
      .insert({
        user_id: subscription.userId,
        email: subscription.email,
        name: subscription.name,
        preferences: subscription.preferences,
        subscribed_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    return toCamelCase<DatabaseMailingListSubscription>(data) as unknown as MailingListSubscription
  } catch (error) {
    console.error('Error creating mailing list subscription:', error)
    throw new Error('Failed to create mailing list subscription')
  }
}

/**
 * Update a mailing list subscription
 */
export async function updateMailingListSubscription(
  id: string,
  subscription: UpdateMailingListSubscription
): Promise<MailingListSubscription> {
  try {
    const { data, error } = await supabaseAdmin
      .from('mailing_list_subscriptions')
      .update({
        name: subscription.name,
        unsubscribed_at: subscription.unsubscribedAt,
        preferences: subscription.preferences,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return toCamelCase<DatabaseMailingListSubscription>(data) as unknown as MailingListSubscription
  } catch (error) {
    console.error(`Error updating mailing list subscription ${id}:`, error)
    throw new Error('Failed to update mailing list subscription')
  }
}

/**
 * Delete a mailing list subscription
 */
export async function deleteMailingListSubscription(id: string): Promise<void> {
  try {
    const { error } = await supabaseAdmin
      .from('mailing_list_subscriptions')
      .delete()
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    console.error(`Error deleting mailing list subscription ${id}:`, error)
    throw new Error('Failed to delete mailing list subscription')
  }
} 