import { supabaseAdmin } from '@/lib/supabase'
import { toCamelCase } from '@/lib/utils/case-transforms'

// Database types
interface DatabaseUserVisit {
  id: string
  user_id: string | null
  path: string
  referrer: string | null
  user_agent: string | null
  created_at: string
  updated_at: string
}

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
  try {
    const { data, error } = await supabaseAdmin
      .from('user_visits')
      .insert({
        user_id: visit.userId,
        path: visit.path,
        referrer: visit.referrer,
        user_agent: visit.userAgent,
      })
      .select()
      .single()

    if (error) throw error

    return toCamelCase<DatabaseUserVisit>(data) as unknown as UserVisit
  } catch (error) {
    console.error('Error creating user visit:', error)
    throw new Error('Failed to create user visit')
  }
}

/**
 * Get all user visits
 */
export async function getUserVisits(): Promise<UserVisit[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('user_visits')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return toCamelCase<DatabaseUserVisit[]>(data || []) as unknown as UserVisit[]
  } catch (error) {
    console.error('Error fetching user visits:', error)
    throw new Error('Failed to fetch user visits')
  }
}

/**
 * Get a single user visit by ID
 */
export async function getUserVisit(id: string): Promise<UserVisit | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('user_visits')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    if (!data) return null

    return toCamelCase<DatabaseUserVisit>(data) as unknown as UserVisit
  } catch (error) {
    console.error(`Error fetching user visit ${id}:`, error)
    throw new Error('Failed to fetch user visit')
  }
}

/**
 * Update a user visit record
 */
export async function updateUserVisit(
  id: string,
  visit: UpdateUserVisit
): Promise<UserVisit> {
  try {
    const { data, error } = await supabaseAdmin
      .from('user_visits')
      .update({
        user_id: visit.userId,
        path: visit.path,
        referrer: visit.referrer,
        user_agent: visit.userAgent,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return toCamelCase<DatabaseUserVisit>(data) as unknown as UserVisit
  } catch (error) {
    console.error(`Error updating user visit ${id}:`, error)
    throw new Error('Failed to update user visit')
  }
}

/**
 * Delete a user visit record
 */
export async function deleteUserVisit(id: string): Promise<void> {
  try {
    const { error } = await supabaseAdmin
      .from('user_visits')
      .delete()
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    console.error(`Error deleting user visit ${id}:`, error)
    throw new Error('Failed to delete user visit')
  }
}

/**
 * Get user visits by path
 */
export async function getUserVisitsByPath(path: string): Promise<UserVisit[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('user_visits')
      .select('*')
      .eq('path', path)
      .order('created_at', { ascending: false })

    if (error) throw error

    return toCamelCase<DatabaseUserVisit[]>(data || []) as unknown as UserVisit[]
  } catch (error) {
    console.error(`Error fetching user visits for path ${path}:`, error)
    throw new Error('Failed to fetch user visits by path')
  }
} 