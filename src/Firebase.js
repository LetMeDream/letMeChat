// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "chat-app-yt-9564d.firebaseapp.com",
  projectId: "chat-app-yt-9564d",
  storageBucket: "chat-app-yt-9564d.appspot.com",
  messagingSenderId: "323333789380",
  appId: "1:323333789380:web:1659adbe457b2955359b91",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* Create an auth object and ship it */
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service (and ship it)
export const db = getFirestore(app);
