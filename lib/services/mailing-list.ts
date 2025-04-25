import { db } from '@/lib/firebase/admin'
import { MailingListSubscription } from '@/types/firebase'
import { Timestamp, QueryDocumentSnapshot, DocumentData } from 'firebase-admin/firestore'

/**
 * Retrieves all mailing list subscriptions from Firebase
 */
export async function getMailingListSubscriptions(): Promise<MailingListSubscription[]> {
  try {
    const querySnapshot = await db.collection('mailing_list_subscriptions').get()
    return querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
      const data = doc.data()
      return {
        id: doc.id,
        user_id: data.user_id,
        email: data.email,
        name: data.name,
        preferences: data.preferences,
        subscribed_at: data.subscribed_at,
        unsubscribed_at: data.unsubscribed_at,
        created_at: data.created_at,
        updated_at: data.updated_at
      } as MailingListSubscription
    })
  } catch (error) {
    console.error('Error getting mailing list subscriptions:', error)
    return []
  }
}

/**
 * Adds a new email subscription to the mailing list
 */
export async function addMailingListSubscription(data: { 
  user_id: string, 
  email: string, 
  name: string | null,
  preferences: {
    marketing: boolean,
    updates: boolean
  }
}): Promise<MailingListSubscription | null> {
  try {
    // Check if email already exists
    const snapshot = await db.collection('mailing_list_subscriptions')
      .where('email', '==', data.email)
      .get()
    
    if (!snapshot.empty) {
      return null
    }

    const timestamp = Timestamp.now()
    const docRef = await db.collection('mailing_list_subscriptions').add({
      user_id: data.user_id,
      email: data.email,
      name: data.name,
      preferences: data.preferences,
      subscribed_at: timestamp,
      unsubscribed_at: null,
      created_at: timestamp,
      updated_at: timestamp
    })

    const doc = await docRef.get()
    const docData = doc.data()
    return {
      id: doc.id,
      user_id: docData?.user_id,
      email: docData?.email,
      name: docData?.name,
      preferences: docData?.preferences,
      subscribed_at: docData?.subscribed_at,
      unsubscribed_at: docData?.unsubscribed_at,
      created_at: docData?.created_at,
      updated_at: docData?.updated_at
    } as MailingListSubscription
  } catch (error) {
    console.error('Error adding mailing list subscription:', error)
    return null
  }
}

/**
 * Removes an email subscription from the mailing list
 */
export async function removeMailingListSubscription(id: string): Promise<boolean> {
  try {
    await db.collection('mailing_list_subscriptions').doc(id).delete()
    return true
  } catch (error) {
    console.error('Error removing mailing list subscription:', error)
    return false
  }
} 