import { supabaseAdmin } from '@/lib/supabase'
import { toCamelCase, toSnakeCase } from '@/lib/utils/transform'
import { Database } from '@/types/supabase'

// Database types
type DbMailingListSubscription = Database['public']['Tables']['mailing_list_subscriptions']['Row']
type DbMailingListInsert = Database['public']['Tables']['mailing_list_subscriptions']['Insert']
type DbMailingListUpdate = Database['public']['Tables']['mailing_list_subscriptions']['Update']

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
  const { data, error } = await supabaseAdmin
    .from('mailing_list_subscriptions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error

  return data.map(subscription => toCamelCase<MailingListSubscription>(subscription))
}

/**
 * Get a single mailing list subscription by ID
 */
export async function getMailingListSubscription(id: string): Promise<MailingListSubscription | null> {
  const { data, error } = await supabaseAdmin
    .from('mailing_list_subscriptions')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  if (!data) return null

  return toCamelCase<MailingListSubscription>(data)
}

/**
 * Create a new mailing list subscription
 */
export async function createMailingListSubscription(
  subscription: CreateMailingListSubscription
): Promise<MailingListSubscription> {
  const dbSubscription = toSnakeCase<DbMailingListInsert>(subscription)

  const { data, error } = await supabaseAdmin
    .from('mailing_list_subscriptions')
    .insert(dbSubscription)
    .select()
    .single()

  if (error) throw error

  return toCamelCase<MailingListSubscription>(data)
}

/**
 * Update a mailing list subscription
 */
export async function updateMailingListSubscription(
  id: string,
  subscription: UpdateMailingListSubscription
): Promise<MailingListSubscription> {
  const dbSubscription = toSnakeCase<DbMailingListUpdate>(subscription)

  const { data, error } = await supabaseAdmin
    .from('mailing_list_subscriptions')
    .update(dbSubscription)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error

  return toCamelCase<MailingListSubscription>(data)
}

/**
 * Delete a mailing list subscription
 */
export async function deleteMailingListSubscription(id: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('mailing_list_subscriptions')
    .delete()
    .eq('id', id)

  if (error) throw error
} 