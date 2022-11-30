// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDAO7VNx6Q1WVUDT3j4xBNPEmHjRw5ujg",
  authDomain: "my-lens-ae741.firebaseapp.com",
  projectId: "my-lens-ae741",
  storageBucket: "my-lens-ae741.appspot.com",
  messagingSenderId: "253140113377",
  appId: "1:253140113377:web:bafadb72fd127ed16424a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth , provider , db };