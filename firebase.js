// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIOSYvRhmFwXIU-jFxlYuK-LooZPAzKAM",
  authDomain: "flashcardsaas-2ddd4.firebaseapp.com",
  projectId: "flashcardsaas-2ddd4",
  storageBucket: "flashcardsaas-2ddd4.appspot.com",
  messagingSenderId: "468340820640",
  appId: "1:468340820640:web:80d7034d1362f3cf1a17c5",
  measurementId: "G-N6G09QRM7Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);