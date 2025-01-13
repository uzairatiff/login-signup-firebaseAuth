// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { setDoc, doc, getFirestore, collection } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALzlPjfd3HDYphrnRb9fZR3fzLN8B4xAI",
  authDomain: "login-signup-app-be8ff.firebaseapp.com",
  databaseURL: "https://login-signup-app-be8ff-default-rtdb.firebaseio.com",
  projectId: "login-signup-app-be8ff",
  storageBucket: "login-signup-app-be8ff.appspot.com",
  messagingSenderId: "270128728212",
  appId: "1:270128728212:web:ce11b57d185bc68bb28c81",
  measurementId: "G-D2W12NXX92",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const firestore = getFirestore()
const auth = getAuth()
  

// Export required Firebase methods
export {
  setDoc,
  getFirestore,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  collection,
  doc,
  db
};
