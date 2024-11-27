// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {initializeAuth,getReactNativePersistence} from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4bTrMKHCEGWMO2rCQGVXqYCVQZetYkJc",
  authDomain: "test-app-cbd7b.firebaseapp.com",
  projectId: "test-app-cbd7b",
  storageBucket: "test-app-cbd7b.firebasestorage.app",
  messagingSenderId: "259555407875",
  appId: "1:259555407875:web:c91c398c857bba24de3636",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app,{
    persistence:getReactNativePersistence(ReactNativeAsyncStorage)
})

export const db = getFirestore(app); 

export default app