// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyA2EpMv3IO2TjzZq9jN0fi7FEizP3PFCnc",
  authDomain: "veterinariaapp-pwa.firebaseapp.com",
  projectId: "veterinariaapp-pwa",
  storageBucket: "veterinariaapp-pwa.appspot.com",
  messagingSenderId: "906800602527",
  appId: "1:906800602527:web:ba9fc22af562bbf6da31aa",
  measurementId: "G-LV1E0RBGTQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);