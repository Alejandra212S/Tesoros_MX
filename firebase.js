import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyATcjeutftBECVLFPMRAzuOFK-g-v8uGB4",
  authDomain: "pruebatssac-6bd1e.firebaseapp.com",
  projectId: "pruebatssac-6bd1e",
  storageBucket: "pruebatssac-6bd1e.firebasestorage.app",
  messagingSenderId: "244946243424",
  appId: "1:244946243424:web:c3a65f8bdee05641e19805"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);