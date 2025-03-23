// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth for Firebase Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpzzn6bxmqmwCytOLkhKMFcv1omfdlTdQ",
  authDomain: "chartdata-fccc8.firebaseapp.com",
  projectId: "chartdata-fccc8",
  storageBucket: "chartdata-fccc8.firebasestorage.app",
  messagingSenderId: "1091431819127",
  appId: "1:1091431819127:web:9966ccefb5a8f45a5b6372",
  measurementId: "G-Y53KWSY9FX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Authentication

export { app, auth, analytics }; // Export for use in other parts of your app
