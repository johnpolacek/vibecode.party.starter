'use server'

import { auth } from "@clerk/nextjs/server"
import { headers } from "next/headers"
import { validRoutes } from "@/lib/generated/routes"
import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"

// Initialize Convex HTTP client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

// Check if the user agent is from a common legitimate browser
function isValidBrowser(userAgent: string | null): boolean {
  if (!userAgent) return false
  
  const commonBrowsers = [
    'Chrome',
    'Firefox',
    'Safari',
    'Edge',
    'Opera',
    'Edg',  // Edge's newer user agent
    'OPR',  // Opera's newer user agent
  ]
  
  const lowerUA = userAgent.toLowerCase()
  return commonBrowsers.some(browser => 
    lowerUA.includes(browser.toLowerCase())
  )
}

// Check if a path exists in our app
function isValidPath(path: string): boolean {
  // Special case for root path
  if (path === '/') {
    return true
  }

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
    
    // Skip recording visits from non-browser user agents
    if (!isValidBrowser(userAgent)) {
      return { success: true }
    }

    // Skip recording visits to invalid paths
    if (!isValidPath(path)) {
      return { success: true }
    }

    // Record the visit using Convex
    await convex.mutation(api.visits.recordVisit, {
      path,
      userId: userId || null,
      metadata: {
        userAgent: userAgent || null,
        referrer: referrer || null,
      }
    })

    return { success: true }
  } catch (error) {
    console.error('Error tracking visit:', error)
    return { success: false, error: (error as Error).message }
  }
} 