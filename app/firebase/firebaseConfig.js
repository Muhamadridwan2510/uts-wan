import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtLloYr_y3Se1HtIAh5sGywIj5zpU9rXg",
  authDomain: "komen-portfolio.firebaseapp.com",
  projectId: "komen-portfolio",
  storageBucket: "komen-portfolio.firebasestorage.app",
  messagingSenderId: "749623248727",
  appId: "1:749623248727:web:a6f7cd23647ade306ee012",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
