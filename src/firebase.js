// Firebase initialization.
//
// Fill these values in from your Firebase project settings
// (Firebase Console -> Project settings -> General -> "Your apps" -> Web app).
// See README.md for the full step-by-step setup.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAtMNVrsTUBJC_3hTAO6Cbe8cSObfdWyaY',
  authDomain: 'yom-hazikaron-20c71.firebaseapp.com',
  projectId: 'yom-hazikaron-20c71',
  storageBucket: 'yom-hazikaron-20c71.firebasestorage.app',
  messagingSenderId: '330219163631',
  appId: '1:330219163631:web:15bd3474728ed35c03701a',
};

// This project's Firestore database was created with a named database ID
// ("yom-hazikaron") rather than the default one — pass it explicitly.
const FIRESTORE_DATABASE_ID = 'yom-hazikaron';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, FIRESTORE_DATABASE_ID);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
