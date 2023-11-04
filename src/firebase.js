import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAe7roW4WlQ29joDCyqjD9Blj-B4vs8pjQ",
    authDomain: "project-insight-fd427.firebaseapp.com",
    projectId: "project-insight-fd427",
    storageBucket: "project-insight-fd427.appspot.com",
    messagingSenderId: "467184374161",
    appId: "1:467184374161:web:af3aeeb189cc4c3d240a30"
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