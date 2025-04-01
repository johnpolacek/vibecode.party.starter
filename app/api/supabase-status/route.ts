import { NextResponse } from "next/server"
import { checkSupabaseConnection } from "@/lib/supabase"
import { auth } from "@clerk/nextjs/server"
import { isAdmin } from "@/lib/auth-utils"

export async function GET() {
  try {
    // Check if the user is authenticated and is an admin
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }
    
    const adminCheck = await isAdmin()
    
    if (!adminCheck) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    // Check Supabase connection
    const connectionCheck = await checkSupabaseConnection()
    
    return NextResponse.json({
      success: connectionCheck.success,
      connection: connectionCheck,
      environment: {
        nodeEnv: process.env.NODE_ENV,
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      }
    })
  } catch (error) {
    console.error("Error checking Supabase status:", error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    )
  }
} 