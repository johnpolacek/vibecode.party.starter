import { createClerkClient } from '@clerk/backend'

if (!process.env.CLERK_SECRET_KEY) {
  throw new Error('CLERK_SECRET_KEY is not defined')
}

export const clerkClient = createClerkClient({ 
  secretKey: process.env.CLERK_SECRET_KEY 
})

// Re-export commonly used types
export type { User } from '@clerk/backend' 