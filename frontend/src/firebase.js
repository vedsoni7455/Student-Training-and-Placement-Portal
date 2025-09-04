// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIZtQ_gHlXA-QVwZ5U9lHQKgh7ATWJ2Ok",
  authDomain: "student-portal-385b8.firebaseapp.com",
  projectId: "student-portal-385b8",
  storageBucket: "student-portal-385b8.firebasestorage.app",
  messagingSenderId: "388769953646",
  appId: "1:388769953646:web:f1dcbcc7a113d93c31737f",
  measurementId: "G-RXQ6C8PXEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, analytics, auth, storage };
