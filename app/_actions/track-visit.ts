'use server'

import { auth } from "@clerk/nextjs/server"
import { headers } from "next/headers"
import { supabaseAdmin } from "@/lib/supabase"
import { validRoutes } from "@/lib/generated/routes"

// Simple function to check common bot patterns
function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false
  const botPatterns = [
    'bot', 'crawler', 'spider', 'headless',
    'selenium', 'puppeteer', 'chrome-lighthouse',
    'googlebot', 'bingbot', 'yandex'
  ]
  return botPatterns.some(pattern => 
    userAgent.toLowerCase().includes(pattern)
  )
}

// Check if a path exists in our app
function isValidPath(path: string): boolean {
  // Normalize the path by removing leading slash
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path

  // Check exact match first
  if (validRoutes.has(normalizedPath)) {
    return true
  }

  // Check if the path matches any dynamic routes
  // Split the path into segments
  const segments = normalizedPath.split('/')
  
  // Try matching each segment level
  let currentPath = ''
  for (const segment of segments) {
    currentPath = currentPath + (currentPath === '' ? segment : '/' + segment)
    // Check if there's a wildcard route at this level
    if (validRoutes.has(currentPath + '/*')) {
      return true
    }
  }

  return false
}

export async function trackVisit(path: string) {
  try {
    // Get the current user's ID if they're authenticated
    const { userId } = await auth()
    
    // Get headers for user agent and referrer
    const headersList = await headers()
    const userAgent = headersList.get('user-agent')
    const referrer = headersList.get('referer') // Note: 'referer' is the standard header name

    // Skip recording visits from bots
    if (isBot(userAgent)) {
      return { success: true }
    }

    // Skip recording visits to invalid paths
    if (!isValidPath(path)) {
      return { success: true }
    }

    // Round timestamp to nearest second and convert to ISO string
    const now = new Date()
    now.setMilliseconds(0)
    const timestamp = now.toISOString()

    // Insert the visit into the database
    const { error } = await supabaseAdmin
      .from('user_visits')
      .insert({
        user_id: userId || null,
        path,
        timestamp,
        user_agent: userAgent || null,
        referrer: referrer || null,
      })

    if (error) {
      console.error('Error tracking visit:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error tracking visit:', error)
    return { success: false, error: (error as Error).message }
  }
} 