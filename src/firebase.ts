import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';

// Import the Firebase configuration
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase SDK
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Helper for Google Login
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

// Helper for Logout
export const logout = () => auth.signOut();

export { collection, addDoc, query, orderBy, onSnapshot, Timestamp, onAuthStateChanged };
export type { User };
