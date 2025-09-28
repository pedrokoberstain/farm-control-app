import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAESx9yZUb9-EnQkIBAls3VF4qIeEnaPTs",
  authDomain: "farm-control-app-a8f63.firebaseapp.com",
  projectId: "farm-control-app-a8f63",
  storageBucket: "farm-control-app-a8f63.appspot.com",
  messagingSenderId: "227069535731",
  appId: "1:227069535731:web:f0a481ee4c87d17f7ede86",
  measurementId: "G-XVG5KQGT4F",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Auth com persistência (necessário no React Native)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore
const db = getFirestore(app);

export { app, auth, db };

