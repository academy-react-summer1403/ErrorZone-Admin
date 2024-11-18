// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_CHATAPI_KEY,
  authDomain: "chatreact-7c67d.firebaseapp.com",
  projectId: "chatreact-7c67d",
  storageBucket: "chatreact-7c67d.firebasestorage.app",
  messagingSenderId: "844887601919",
  appId: "1:844887601919:web:fae3fba58fb611632192ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
