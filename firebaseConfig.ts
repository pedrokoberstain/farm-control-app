// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAESx9yZUb9-EnQkIBAls3VF4qIeEnaPTs",
  authDomain: "farm-control-app-a8f63.firebaseapp.com",
  projectId: "farm-control-app-a8f63",
  storageBucket: "farm-control-app-a8f63.firebasestorage.app",
  messagingSenderId: "227069535731",
  appId: "1:227069535731:web:f0a481ee4c87d17f7ede86",
  measurementId: "G-XVG5KQGT4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { analytics, auth };
