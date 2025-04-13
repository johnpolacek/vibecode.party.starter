import { supabaseAdmin } from '@/lib/supabase'
import { toClientCase, toDatabaseCase, ToCamelCase } from '@/lib/utils/case-transforms'
import { Database } from '@/types/supabase'

// Define the client-side type with camelCase
export interface UserVisit {
  id: string
  userId: string | null
  path: string
  referrer: string | null
  userAgent: string | null
  timestamp: string
  createdAt: string
  updatedAt: string
}

// Type for creating a new visit (subset of fields)
export interface CreateUserVisit {
  userId?: string
  path: string
  referrer?: string
  userAgent?: string
}

// Convert database type to client type
type DatabaseUserVisit = Database['public']['Tables']['user_visits']['Row']
type ClientUserVisit = ToCamelCase<DatabaseUserVisit>

export async function createUserVisit(visit: CreateUserVisit) {
  // Convert camelCase to snake_case for database
  const dbVisit = toDatabaseCase(visit)
  
  const { data, error } = await supabaseAdmin
    .from('user_visits')
    .insert(dbVisit)
    .select()
    .single()

  if (error) throw error

  // Convert snake_case back to camelCase for client
  return toClientCase(data) as ClientUserVisit
}

export async function getUserVisits() {
  const { data, error } = await supabaseAdmin
    .from('user_visits')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error

  // Convert all results from snake_case to camelCase
  return data.map((visit: DatabaseUserVisit) => toClientCase(visit)) as ClientUserVisit[]
}

export async function getUserVisitsByPath(path: string) {
  const { data, error } = await supabaseAdmin
    .from('user_visits')
    .select('*')
    .eq('path', path)
    .order('created_at', { ascending: false })

  if (error) throw error

  // Convert all results from snake_case to camelCase
  return data.map((visit: DatabaseUserVisit) => toClientCase(visit)) as ClientUserVisit[]
} 