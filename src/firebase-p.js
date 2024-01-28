import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_PD,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_PD,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_PD,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_PD,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_PD,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID_PD,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, '[FIREBASE_P]');
export const db = getFirestore(app);
export const storage = getStorage(app);