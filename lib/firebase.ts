import { Auth, GoogleAuthProvider, getAuth, updateProfile, User, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { FirebaseApp, initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, Firestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager, setLogLevel } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;
let db: Firestore | null = null;

if (
  typeof window !== "undefined" &&
  (!firebaseConfig.apiKey || firebaseConfig.apiKey === "your_api_key_here")
) {
  console.error("Firebase config is missing or invalid. Check .env.local");
} else {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();

    // Initialize Firestore
    if (typeof window !== "undefined") {
      // Suppress harmless Firestore warnings in development
      setLogLevel('error');

      // Client-side: Enable offline persistence & long polling
      try {
        db = initializeFirestore(app, {
          experimentalForceLongPolling: true,
          localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
        });
      } catch (e: any) {
        // If already initialized (e.g., during hot reload), use existing instance
        if (e.code === 'failed-precondition' || e.message?.includes('already been called')) {
          db = getFirestore(app);
        } else {
          console.error("Error initializing Firestore settings:", e);
          db = getFirestore(app); // Fallback
        }
      }
    } else {
      // Server-side: Standard initialization
      db = getFirestore(app);
    }
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
}

export { auth, googleProvider, db };
