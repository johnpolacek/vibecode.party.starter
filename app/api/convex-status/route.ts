import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if Convex URL is configured
    const isConfigured = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL)

    if (!isConfigured) {
      return NextResponse.json(
        {
          status: "not_configured",
          message: "Convex is not configured. Please set NEXT_PUBLIC_CONVEX_URL in your .env file.",
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        status: "ready",
        message: "Convex is configured and ready to use.",
        url: process.env.NEXT_PUBLIC_CONVEX_URL,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error checking Convex status:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to check Convex status",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
} 