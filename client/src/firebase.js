// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwoPELe_FLwqpN5cjOFalLuD0ygzK0oBw",
  authDomain: "akshat-s-blog.firebaseapp.com",
  projectId: "akshat-s-blog",
  storageBucket: "akshat-s-blog.appspot.com",
  messagingSenderId: "840694219681",
  appId: "1:840694219681:web:9cad11dde10d29f0af01e0",
  measurementId: "G-PV8G76PEZ5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
