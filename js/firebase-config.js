// Firebase configuration and initialization (CDN modular v9)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFb1iKOf8nT81pJo5sg2ce1NvQgoodojU",
  authDomain: "ooaps-31490193-9b66a.firebaseapp.com",
  projectId: "ooaps-31490193-9b66a",
  storageBucket: "ooaps-31490193-9b66a.firebasestorage.app",
  messagingSenderId: "598660924916",
  appId: "1:598660924916:web:2179cb81938ac9883265a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
