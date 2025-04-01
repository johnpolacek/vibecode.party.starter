import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { supabaseAdmin } from "@/lib/supabase"
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_SCOPES } from "@/lib/github"

// GitHub OAuth endpoints
const GITHUB_OAUTH_URL = "https://github.com/login/oauth/authorize"
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token"

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the participant ID from the query string
    const searchParams = request.nextUrl.searchParams
    const participantId = searchParams.get("participant_id")
    const stateParam = searchParams.get("state")

    if (!participantId) {
      return NextResponse.json(
        { error: "Missing participant ID" },
        { status: 400 }
      )
    }

    // If we have a state parameter, this is the OAuth callback
    if (stateParam) {
      const code = searchParams.get("code")
      if (!code) {
        return NextResponse.json(
          { error: "Missing authorization code" },
          { status: 400 }
        )
      }

      // Exchange the code for an access token
      const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
        }),
      })

      const tokenData = await tokenResponse.json()
      if (!tokenData.access_token) {
        return NextResponse.json(
          { error: "Failed to get access token" },
          { status: 500 }
        )
      }

      // Store the access token in the database
      const { error } = await supabaseAdmin
        .from("hackathon_participants")
        .update({
          github_access_token: tokenData.access_token,
        })
        .eq("id", participantId)

      if (error) {
        return NextResponse.json(
          { error: "Failed to store access token" },
          { status: 500 }
        )
      }

      // Redirect back to the participant page
      const url = new URL(request.nextUrl)
      const redirectUrl = `${url.origin}/${participantId}`
      return NextResponse.redirect(redirectUrl)
    }

    // Generate a random state for CSRF protection
    const newState = Math.random().toString(36).substring(7)

    // Build the OAuth URL
    const oauthUrl = new URL(GITHUB_OAUTH_URL)
    oauthUrl.searchParams.set("client_id", GITHUB_CLIENT_ID)
    oauthUrl.searchParams.set("scope", GITHUB_SCOPES.join(" "))
    oauthUrl.searchParams.set("state", newState)
    oauthUrl.searchParams.set("participant_id", participantId)

    // The redirect_uri should be this same endpoint
    const url = new URL(request.nextUrl)
    const redirectUri = `${url.origin}/api/github/oauth`
    oauthUrl.searchParams.set("redirect_uri", redirectUri)

    return NextResponse.redirect(oauthUrl.toString())
  } catch (error) {
    console.error("GitHub OAuth error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 