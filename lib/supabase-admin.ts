import { createClient } from "@supabase/supabase-js"
import { Database } from "@/types/supabase"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let _supabaseAdmin: ReturnType<typeof createClient<Database>> | null = null

function getSupabaseAdmin() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null
  }

  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceRoleKey)
  }

  return _supabaseAdmin
}

// Create a mock query builder that returns null data for all operations
class MockQueryBuilder {
  select() {
    return this
  }
  insert() {
    return Promise.resolve({ data: null, error: null })
  }
  update() {
    return Promise.resolve({ data: null, error: null })
  }
  delete() {
    return Promise.resolve({ data: null, error: null })
  }
  eq() {
    return this
  }
  or() {
    return this
  }
  maybeSingle() {
    return Promise.resolve({ data: null, error: null })
  }
  single() {
    return Promise.resolve({ data: null, error: null })
  }
  order() {
    return this
  }
  limit() {
    return this
  }
  range() {
    return this
  }
  filter() {
    return this
  }
  throwOnError() {
    return this
  }
  abortSignal() {
    return this
  }
  count() {
    return this
  }
  returns() {
    return this
  }
}

export const supabaseAdmin = {
  from: (table: string) => {
    const client = getSupabaseAdmin()
    if (!client) {
      // Use a type assertion that matches the basic structure of a Supabase query builder
      return new MockQueryBuilder() as unknown as ReturnType<NonNullable<typeof client>['from']>
    }
    return client.from(table)
  },
} 