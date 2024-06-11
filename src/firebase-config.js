import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcSbn9lad8rnmvHiKUYRa3jvMSuMMeUBo",
  authDomain: "sentinews-739d1.firebaseapp.com",
  projectId: "sentinews-739d1",
  storageBucket: "sentinews-739d1.appspot.com",
  messagingSenderId: "1082241730816",
  appId: "1:1082241730816:web:bd9cc75b479cc34fe00be5",
  measurementId: "G-HTCRBTX8PK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase 인증 및 Firestore 초기화
export const auth = getAuth(app);
export const db = getFirestore(app);