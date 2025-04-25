import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'test-api-key',
  authDomain: 'vibestarter.firebaseapp.com',
  projectId: 'vibestarter',
  storageBucket: 'vibestarter.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdef123456789',
};

let clientDb: Firestore | undefined;

// Initialize Firebase and Firestore as a singleton
function getClientFirestoreInstance() {
  if (clientDb) return clientDb;

  try {
    // Initialize Firebase if not already initialized
    const apps = getApps();
    const app = apps.length ? apps[0] : initializeApp(firebaseConfig);

    // Initialize Firestore
    clientDb = getFirestore(app);

    // Connect to emulator in development or test
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      try {
        connectFirestoreEmulator(clientDb, '127.0.0.1', 8080);
      } catch (error) {
        // Ignore if already connected to emulator
        if (!(error instanceof Error) || !error.message.includes('already')) {
          throw error;
        }
      }
    }

    return clientDb;
  } catch (error) {
    console.error('Error initializing client Firestore:', error);
    throw error;
  }
}

// Export a getter function instead of the instance directly
let dbInstance: Firestore | undefined;
export const db = new Proxy({} as Firestore, {
  get: (target, prop: keyof Firestore | string | symbol) => {
    if (!dbInstance) {
      dbInstance = getClientFirestoreInstance();
    }
    // Type assertion is safe here because we know dbInstance is Firestore after initialization
    return dbInstance ? dbInstance[prop as keyof Firestore] : undefined;
  }
}) as Firestore; 