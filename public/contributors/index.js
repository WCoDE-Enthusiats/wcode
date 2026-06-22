import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyBJoN1vojC-zNj20tyCeGBxZF-R7FqECWg",
  authDomain: "wcode-site.firebaseapp.com",
  projectId: "wcode-site",
  storageBucket: "wcode-site.firebasestorage.app",
  messagingSenderId: "739657322778",
  appId: "1:739657322778:web:009598c3d80da4a2761ca3",
  measurementId: "G-Y0WWQDG9RV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const project_id = localStorage.getItem("project_id");

