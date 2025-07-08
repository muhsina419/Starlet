// src/firebaseConfig.ts

// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6KKsL-jfjakG4pdAahNSnIu6qL9jejr8",
  authDomain: "accessibleplaces-83755.firebaseapp.com",
  projectId: "accessibleplaces-83755",
  storageBucket: "accessibleplaces-83755.firebasestorage.app",
  messagingSenderId: "454226117690",
  appId: "1:454226117690:web:07f1a66217da06d7df2103",
  measurementId: "G-W28LH1Z57Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Optional
export const auth = getAuth(app);
export const db = getFirestore(app);
