import { Auth, GoogleAuthProvider, getAuth } from "firebase/auth";
import { FirebaseApp, initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, Firestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager, setLogLevel } from "firebase/firestore";
import { getAnalytics, Analytics } from "firebase/analytics";

// Explicit configuration provided by user
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp;
let auth: Auth;
let googleProvider: GoogleAuthProvider;
let db: Firestore;
let analytics: Analytics | null = null;

try {
  // Initialize App
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

  // Initialize Auth
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();

  // Initialize Firestore
  if (typeof window !== "undefined") {
    // Client-side: Enable offline persistence & long polling
    setLogLevel('error');
    try {
      db = initializeFirestore(app, {
        experimentalForceLongPolling: true,
        localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
      });
    } catch (e: any) {
      // If already initialized, fallback
      if (e.code === 'failed-precondition' || e.message?.includes('already been called')) {
        db = getFirestore(app);
      } else {
        console.error("Error initializing Firestore settings:", e);
        db = getFirestore(app);
      }
    }

    // Initialize Analytics (Client-side only)
    try {
      analytics = getAnalytics(app);
    } catch (e) {
      console.warn("Firebase Analytics failed to initialize:", e);
    }

  } else {
    // Server-side
    db = getFirestore(app);
  }

} catch (error) {
  console.error("Error initializing Firebase:", error);
  // @ts-ignore
  app = null; auth = null; db = null; googleProvider = null;
}

export { auth, googleProvider, db, app, analytics };
