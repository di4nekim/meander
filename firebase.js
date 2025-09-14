//Firebase Configuration with Demo Mode Support

// Enable demo mode for instant functionality without Firebase setup
// Auto-detect: demo mode if no firebase.config.js exists, or set explicitly
let DEMO_MODE = true;
try {
  require('./firebase.config.js');
  // If config exists, user can choose mode
  DEMO_MODE = process.env.EXPO_PUBLIC_DEMO_MODE !== 'false';
} catch (error) {
  // No config file = demo mode automatically
  DEMO_MODE = true;
}

if (DEMO_MODE) {
  console.log('🎭 Running in DEMO MODE - No Firebase configuration required!');
  console.log('Demo credentials: Use any email from the list with password "demo123"');
  console.log('Available demo users: alice@demo.com, bob@demo.com, carol@demo.com');
  
  // Export mock Firebase services
  export * from './services/mockFirebase';
} else {
  // Real Firebase implementation
  import { initializeApp } from "firebase/app";
  import { getAuth, GoogleAuthProvider } from "firebase/auth";
  import { initializeAuth, getReactNativePersistence } from "firebase/auth";
  import { getFirestore } from "firebase/firestore/lite";
  
  // Import your actual Firebase configuration
  let firebaseConfig;
  try {
    firebaseConfig = require('./firebase.config.js').firebaseConfig;
  } catch (error) {
    console.error('Firebase config not found. Copy firebase.config.example.js to firebase.config.js and update with your credentials.');
    throw new Error('Firebase configuration required when DEMO_MODE is false');
  }

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const db = getFirestore(app);

  export { app, auth, provider, db };
}
