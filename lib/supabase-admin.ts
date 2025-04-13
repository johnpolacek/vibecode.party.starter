import { createClient } from "@supabase/supabase-js"
import { Database } from "@/types/supabase"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL")
if (!supabaseServiceRoleKey) throw new Error("Missing env.SUPABASE_SERVICE_ROLE_KEY")

export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceRoleKey) 