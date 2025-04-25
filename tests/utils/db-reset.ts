import { db } from '@/lib/firebase/admin'
import { QueryDocumentSnapshot, DocumentData } from 'firebase-admin/firestore'
import { clerkClient } from '@clerk/clerk-sdk-node'
import dotenv from 'dotenv'

dotenv.config()

const COLLECTIONS_TO_RESET = ['mailing_list_subscriptions', 'user_visits']

/**
 * Delete all documents in a collection
 */
export async function deleteCollection(collectionName: string): Promise<void> {
  try {
    const collectionRef = db.collection(collectionName)
    const snapshot = await collectionRef.get()

    if (snapshot.empty) {
      console.log(`Collection ${collectionName} is empty or does not exist. Skipping...`)
      return
    }

    const batch = db.batch()
    snapshot.docs.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
      batch.delete(doc.ref)
    })

    await batch.commit()
    console.log(`Deleted ${snapshot.size} documents from ${collectionName}`)
  } catch (error) {
    console.warn(`Warning: Failed to delete collection ${collectionName}:`, error)
  }
}

/**
 * Reset database for testing
 */
export async function resetDatabase(): Promise<void> {
  console.log('Resetting database...')

  for (const collection of COLLECTIONS_TO_RESET) {
    await deleteCollection(collection)
  }

  console.log('Database reset complete')
}

/**
 * Verify that all collections are empty
 */
export async function verifyDatabaseReset(): Promise<boolean> {
  for (const collection of COLLECTIONS_TO_RESET) {
    const snapshot = await db.collection(collection).get()
    if (!snapshot.empty) {
      console.error(`Collection ${collection} is not empty`)
      return false
    }
  }
  return true
}

/**
 * Reset database for testing
 */
export async function setupTestDatabase(): Promise<void> {
  await resetDatabase()
}

/**
 * Seed test data
 */
export async function seedTestData(): Promise<void> {
  console.log('Seeding test data...')
  console.log('Test data seeding complete')
} 