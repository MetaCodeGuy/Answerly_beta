import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage'
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBBtblxLCPWRypNWdVJ8AtfiJZV99sg7z4",
  authDomain: "arthub-f6303.firebaseapp.com",
  projectId: "arthub-f6303",
  storageBucket: "arthub-f6303.appspot.com",
  messagingSenderId: "115671982311",
  appId: "1:115671982311:web:1785dd50154a63493a4242",
  measurementId: "G-FP7NWMFDJD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
export const storage = getStorage(app)
export const auth = initializeAuth(app, { persistence: getReactNativePersistence(ReactNativeAsyncStorage) })
