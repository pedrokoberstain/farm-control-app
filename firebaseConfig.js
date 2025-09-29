import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence } from './firebase-persistence/react_native';

const firebaseConfig = {
  apiKey: "AIzaSyAESx9yZUb9-EnQkIBAls3VF4qIeEnaPTs",
  authDomain: "farm-control-app-a8f63.firebaseapp.com",
  projectId: "farm-control-app-a8f63",
  storageBucket: "farm-control-app-a8f63.firebasestorage.app",
  messagingSenderId: "227069535731",
  appId: "1:227069535731:web:f0a481ee4c87d17f7ede86",
  measurementId: "G-XVG5KQGT4F",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

export { auth, db };
