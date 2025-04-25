import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

// Declare global type
declare global {
  var _firestore: Firestore | undefined;
}

function initializeFirebaseAdmin() {
  if (!getApps().length) {
    // Use demo config for development and test environments
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      initializeApp({
        projectId: 'demo-project'
      });
    } else {
      if (!process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL) {
        throw new Error('Firebase Admin credentials are required in production');
      }
      
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          // Replace escaped newlines in private key
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
    }
  }
}

function getFirestoreInstance(): Firestore {
  if (!global._firestore) {
    // Ensure Firebase Admin is initialized
    initializeFirebaseAdmin();
    
    // Initialize Firestore
    const db = getFirestore();
    
    // Configure settings for development or test
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      db.settings({
        host: '127.0.0.1:8080',
        ssl: false,
        ignoreUndefinedProperties: true
      });
    }

    // Store in global scope
    global._firestore = db;
  }
  
  return global._firestore;
}

// Export the singleton instance
export const db = getFirestoreInstance(); 