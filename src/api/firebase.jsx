// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZNX2Z2IV8aaMFT6WejCEbuIxJnsny35I",
  authDomain: "mongfrens.firebaseapp.com",
  projectId: "mongfrens",
  storageBucket: "mongfrens.appspot.com",
  messagingSenderId: "250037359905",
  appId: "1:250037359905:web:46a33c22c7b8a7d981da60",
  measurementId: "G-GVF37LCPTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const store = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth , provider, db, store};
const analytics = getAnalytics(app);