/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

// Use a module-level variable instead of global
let _firestoreInstance: Firestore | undefined;

// Mock Firestore for build phase
class MockFirestore {
  collection() {
    return {
      get: () => Promise.resolve({ docs: [] }),
      doc: () => ({
        get: () => Promise.resolve({ data: () => ({}) }),
        set: () => Promise.resolve(),
        update: () => Promise.resolve(),
        delete: () => Promise.resolve(),
      }),
    };
  }
  settings() {}
}

function initializeFirebaseAdmin() {
  // Skip initialization during build
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return;
  }

  // Only initialize if no apps exist
  if (getApps().length === 0) {
    // Use demo config for development and test environments
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      initializeApp({
        projectId: 'demo-project'
      });
    } else {
      if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL) {
        throw new Error('Firebase Admin credentials are required in production');
      }
      
      initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID,
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

function getFirestoreInstance(): any {
  // Return mock during build
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return new MockFirestore();
  }

  if (!_firestoreInstance) {
    try {
      // Ensure Firebase Admin is initialized
      initializeFirebaseAdmin();
      
      // Initialize Firestore
      _firestoreInstance = getFirestore();
      
      // Configure settings for development or test
      if ((process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') && _firestoreInstance) {
        try {
          _firestoreInstance.settings({
            host: '127.0.0.1:8080',
            ssl: false,
            ignoreUndefinedProperties: true
          });
        } catch (error) {
          // If settings have already been applied, ignore the error
          if (!(error instanceof Error) || !error.message.includes('already been initialized')) {
            throw error;
          }
        }
      }
    } catch (error) {
      console.error('Error initializing Firestore:', error);
      throw error;
    }
  }
  
  return _firestoreInstance;
}

// Export a getter function instead of the instance directly
let dbInstance: any;
export const db = new Proxy({} as any, {
  get: (target, prop) => {
    if (!dbInstance) {
      dbInstance = getFirestoreInstance();
    }
    return dbInstance[prop];
  }
}); 