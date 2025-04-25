import { db } from './admin';
import { Timestamp, Query, DocumentData } from 'firebase-admin/firestore';
import { 
  FirestoreDocument, 
  FirestoreResponse, 
  FirestoreQuery,
  FirestoreOrderBy 
} from '@/types/firebase';

/**
 * Add a new document to a collection with auto-generated ID
 */
export async function addDoc<T extends FirestoreDocument>(
  collection: string,
  data: Omit<T, keyof FirestoreDocument>
): Promise<FirestoreResponse<T>> {
  try {
    const docRef = db.collection(collection).doc();
    const timestamp = Timestamp.now();
    
    const documentData = {
      ...data,
      created_at: timestamp,
      updated_at: timestamp,
    };

    await docRef.set(documentData);
    return { 
      success: true, 
      id: docRef.id,
      data: { id: docRef.id, ...documentData } as T
    };
  } catch (error) {
    console.error(`Error adding document to ${collection}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Set a document with a specific ID
 */
export async function setDoc<T extends FirestoreDocument>(
  collection: string,
  id: string,
  data: Omit<T, keyof FirestoreDocument>
): Promise<FirestoreResponse<T>> {
  try {
    const docRef = db.collection(collection).doc(id);
    const timestamp = Timestamp.now();
    
    const documentData = {
      ...data,
      created_at: timestamp,
      updated_at: timestamp,
    };

    await docRef.set(documentData);
    return { 
      success: true, 
      id: docRef.id,
      data: { id: docRef.id, ...documentData } as T
    };
  } catch (error) {
    console.error(`Error setting document ${id} in ${collection}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Update an existing document
 */
export async function updateDoc<T extends FirestoreDocument>(
  collection: string,
  id: string,
  data: Partial<Omit<T, keyof FirestoreDocument>>
): Promise<FirestoreResponse<T>> {
  try {
    const docRef = db.collection(collection).doc(id);
    
    const documentData = {
      ...data,
      updated_at: Timestamp.now(),
    };

    await docRef.update(documentData);
    return { success: true, id };
  } catch (error) {
    console.error(`Error updating document ${id} in ${collection}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Get a document by ID
 */
export async function getDoc<T extends FirestoreDocument>(
  collection: string,
  id: string
): Promise<FirestoreResponse<T>> {
  try {
    const docRef = db.collection(collection).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return { success: false, error: 'Document not found' };
    }

    return { 
      success: true, 
      data: { id: doc.id, ...doc.data() } as T 
    };
  } catch (error) {
    console.error(`Error getting document ${id} from ${collection}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Delete a document
 */
export async function deleteDoc(
  collection: string,
  id: string
): Promise<FirestoreResponse> {
  try {
    const docRef = db.collection(collection).doc(id);
    await docRef.delete();

    return { success: true, id };
  } catch (error) {
    console.error(`Error deleting document ${id} from ${collection}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Query documents in a collection
 */
export async function getDocs<T extends FirestoreDocument>(
  collection: string,
  queries?: FirestoreQuery[],
  limit?: number,
  orderBy?: FirestoreOrderBy
): Promise<FirestoreResponse<T[]>> {
  try {
    let query: Query<DocumentData> = db.collection(collection);

    // Apply where clauses
    if (queries) {
      queries.forEach(({ field, operator, value }) => {
        query = query.where(field, operator, value);
      });
    }

    // Apply ordering
    if (orderBy) {
      query = query.orderBy(orderBy.field, orderBy.direction);
    }

    // Apply limit
    if (limit) {
      query = query.limit(limit);
    }

    const snapshot = await query.get();
    const docs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];

    return { success: true, data: docs };
  } catch (error) {
    console.error(`Error querying collection ${collection}:`, error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
} 