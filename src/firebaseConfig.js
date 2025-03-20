// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYgd1-R3R4-dFqDWlwrmECVnk_7n0ubp4",
  authDomain: "csci2690-4fea5.firebaseapp.com",
  projectId: "csci2690-4fea5",
  storageBucket: "csci2690-4fea5.firebasestorage.app",
  messagingSenderId: "620515156766",
  appId: "1:620515156766:web:153ff712a373aa79e2df0f",
  measurementId: "G-L624F07EJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);