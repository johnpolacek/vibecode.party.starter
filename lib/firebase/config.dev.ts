import { connectFirestoreEmulator } from 'firebase/firestore';
import { db } from './config';

if (process.env.NODE_ENV === 'development') {
  try {
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
  } catch (error: unknown) {
    // Ignore if emulator is already connected
    if (error instanceof Error && !error.message.includes('already')) {
      console.error('Error connecting to Firestore emulator:', error);
    }
  }
} 