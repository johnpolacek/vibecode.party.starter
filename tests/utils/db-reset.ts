import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"
import dotenv from 'dotenv'

dotenv.config()
const NODE_ENV = process.env.NODE_ENV || 'test'

// Ensure we're in test environment
if (NODE_ENV !== 'test' && NODE_ENV !== 'development') {
  throw new Error('Database reset utilities should only be used in test or development environment')
}

// Initialize Convex client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const TABLES_TO_RESET = ['mailing_list_subscriptions', 'visits'] as const
// Restrict to allowed table names for type safety
type TableName = typeof TABLES_TO_RESET[number]

/**
 * Delete all documents in a table
 */
export async function deleteCollection(tableName: TableName): Promise<void> {
  try {
    await convex.mutation(api.testing.deleteAll, { tableName })
    console.log(`Deleted all documents from ${tableName}`)
  } catch (error) {
    console.warn(`Warning: Failed to delete table ${tableName}:`, error)
  }
}

/**
 * Reset database for testing
 */
export async function resetDatabase(): Promise<void> {
  console.log('Resetting database...')
  for (const table of TABLES_TO_RESET) {
    await deleteCollection(table)
  }
  console.log('Database reset complete')
}

/**
 * Seed test data using Convex test mutation
 */
export async function seedTestData(): Promise<void> {
  console.log('Seeding test data...')
  await convex.mutation(api.testing.seedTestData, {})
  console.log('Test data seeding complete')
}

/**
 * Verify that all tables are empty
 */
export async function verifyDatabaseReset(): Promise<boolean> {
  try {
    for (const table of TABLES_TO_RESET) {
      const count = await convex.query(api.testing.countDocuments, { tableName: table })
      if (count > 0) {
        console.error(`Table ${table} is not empty`)
        return false
      }
    }
    return true
  } catch (error) {
    console.error('Error verifying database reset:', error)
    return false
  }
}

/**
 * Reset database for testing
 */
export async function setupTestDatabase(): Promise<void> {
  await resetDatabase()
  const isReset = await verifyDatabaseReset()
  if (!isReset) {
    throw new Error('Failed to reset database')
  }
} 