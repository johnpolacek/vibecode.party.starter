import { supabaseAdmin } from '@/lib/supabase'
import { toCamelCase, toSnakeCase } from '@/lib/utils/transform'
import { Database } from '@/types/supabase'

// Database types
type DbUserVisit = Database['public']['Tables']['user_visits']['Row']
type DbUserVisitInsert = Database['public']['Tables']['user_visits']['Insert']
type DbUserVisitUpdate = Database['public']['Tables']['user_visits']['Update']

// Frontend types
export interface UserVisit {
  id: string
  userId: string | null
  path: string
  referrer: string | null
  userAgent: string | null
  createdAt: string
  updatedAt: string
}

export interface CreateUserVisit {
  userId?: string | null
  path: string
  referrer?: string | null
  userAgent?: string | null
}

export interface UpdateUserVisit {
  userId?: string | null
  path?: string
  referrer?: string | null
  userAgent?: string | null
}

/**
 * Create a new user visit record
 */
export async function createUserVisit(visit: CreateUserVisit): Promise<UserVisit> {
  const dbVisit = toSnakeCase<DbUserVisitInsert>(visit)
  
  const { data, error } = await supabaseAdmin
    .from('user_visits')
    .insert(dbVisit)
    .select()
    .single()

  if (error) throw error

  return toCamelCase<UserVisit>(data)
}

/**
 * Get all user visits
 */
export async function getUserVisits(): Promise<UserVisit[]> {
  const { data, error } = await supabaseAdmin
    .from('user_visits')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error

  return data.map(visit => toCamelCase<UserVisit>(visit))
}

/**
 * Get a single user visit by ID
 */
export async function getUserVisit(id: string): Promise<UserVisit | null> {
  const { data, error } = await supabaseAdmin
    .from('user_visits')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  if (!data) return null

  return toCamelCase<UserVisit>(data)
}

/**
 * Update a user visit record
 */
export async function updateUserVisit(
  id: string,
  visit: UpdateUserVisit
): Promise<UserVisit> {
  const dbVisit = toSnakeCase<DbUserVisitUpdate>(visit)

  const { data, error } = await supabaseAdmin
    .from('user_visits')
    .update(dbVisit)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error

  return toCamelCase<UserVisit>(data)
}

/**
 * Delete a user visit record
 */
export async function deleteUserVisit(id: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('user_visits')
    .delete()
    .eq('id', id)

  if (error) throw error
}

/**
 * Get user visits by path
 */
export async function getUserVisitsByPath(path: string): Promise<UserVisit[]> {
  const { data, error } = await supabaseAdmin
    .from('user_visits')
    .select('*')
    .eq('path', path)
    .order('created_at', { ascending: false })

  if (error) throw error

  return data.map(visit => toCamelCase<UserVisit>(visit))
} 