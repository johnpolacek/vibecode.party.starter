import Stripe from "stripe"

// Environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

// Log missing variables in development only
if (process.env.NODE_ENV === 'development' && !stripeSecretKey) {
  console.warn('Missing Stripe secret key environment variable')
}

// Function to check if Stripe is configured
export function isStripeConfigured(): boolean {
  return Boolean(stripeSecretKey)
}

// Create a Stripe instance if configured
export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2025-04-30.basil",
    })
  : null

// Function to check Stripe connection
export async function checkStripeConnection(): Promise<{
  success: boolean
  message: string
  details?: {
    error?: unknown
  }
}> {
  if (!isStripeConfigured()) {
    return {
      success: false,
      message: 'Stripe is not configured',
      details: {
        error: 'Missing required environment variables'
      }
    }
  }

  try {
    // Try to make a simple API call to verify connection
    await stripe?.balance.retrieve()
    
    return {
      success: true,
      message: 'Successfully connected to Stripe'
    }
  } catch (err) {
    console.error('Unexpected error checking Stripe connection:', err)
    return {
      success: false,
      message: `Unexpected error: ${err instanceof Error ? err.message : String(err)}`,
      details: { error: err }
    }
  }
} 