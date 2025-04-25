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

  // Initialize Firebase if not already initialized
  const apps = getApps();
  const app = apps.length ? apps[0] : initializeApp(firebaseConfig);

  // Initialize Firestore
  clientDb = getFirestore(app);

  // Connect to emulator in development or test
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    console.log('Connecting to Firestore emulator...');
    connectFirestoreEmulator(clientDb, '127.0.0.1', 8080);
  }

  return clientDb;
}

// Export the singleton getter
export const db = getClientFirestoreInstance(); 