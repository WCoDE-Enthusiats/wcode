// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

let doc_id = window.localStorage.getItem('doc_id');
if (doc_id == null) {window.location.href = '../login'; }

let user_firebase_document;
try {
    user_firebase_document = await getDoc(doc(db, "users", doc_id));
} catch (e) {
    console.log(e);
    window.localStorage.removeItem("doc_id");
    window.location.href = '../login';
}

document.getElementById('baby').innerText = `Oh hi ${user_firebase_document.data().name}`;