import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function requireAuthMiddleware() {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    )
  }

  return null // Continue to route handler
} 