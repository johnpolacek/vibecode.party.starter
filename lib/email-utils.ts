import { createHash } from "crypto"

/**
 * Generates a secure token for email unsubscribe links
 * @param email The email address to generate a token for
 * @returns A secure hash that can be used in unsubscribe links
 */
export function generateUnsubscribeToken(email: string): string {
  if (!process.env.UNSUBSCRIBE_SECRET) {
    throw new Error("UNSUBSCRIBE_SECRET environment variable is not set")
  }

  // Combine email with secret and current year-month
  // This makes the token valid for one month
  const date = new Date()
  const yearMonth = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, "0")}`
  const data = `${email}:${yearMonth}:${process.env.UNSUBSCRIBE_SECRET}`

  // Create a SHA-256 hash
  return createHash("sha256").update(data).digest("hex")
}

/**
 * Verifies if an unsubscribe token is valid for a given email
 * @param email The email address to verify
 * @param token The token to verify
 * @returns boolean indicating if the token is valid
 */
export function verifyUnsubscribeToken(email: string, token: string): boolean {
  // Generate a token for the current month and previous month
  // This gives users a grace period when links cross month boundaries
  const currentToken = generateUnsubscribeToken(email)
  
  // Generate token for previous month
  const lastMonth = new Date()
  lastMonth.setUTCMonth(lastMonth.getUTCMonth() - 1)
  const yearMonth = `${lastMonth.getUTCFullYear()}-${(lastMonth.getUTCMonth() + 1).toString().padStart(2, "0")}`
  const lastMonthData = `${email}:${yearMonth}:${process.env.UNSUBSCRIBE_SECRET}`
  const previousToken = createHash("sha256").update(lastMonthData).digest("hex")

  // Check if the token matches either current or previous month
  return token === currentToken || token === previousToken
}

/**
 * Encodes an email address for use in URLs
 * @param email The email address to encode
 * @returns URL-safe base64 encoded email
 */
export function encodeEmail(email: string): string {
  return Buffer.from(email).toString("base64url")
}

/**
 * Decodes an encoded email address from a URL
 * @param encoded The encoded email to decode
 * @returns The original email address
 */
export function decodeEmail(encoded: string): string {
  return Buffer.from(encoded, "base64url").toString("utf-8")
} 