import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_DIARY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_DIARY,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_DIARY,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_DIARY,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_DIARY,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID_DIARY,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export let firebaseAnalytics;
if (typeof window !== 'undefined') {
    firebaseAnalytics = getAnalytics(app)
} else {
    null;
}