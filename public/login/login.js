
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";
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

window.onkeydown = (event) => { if (event.key == 'Enter') login(); };

const id_input = document.getElementById('id_input');
const span_text = document.getElementById("span_text");
async function login () {
    const siphoned_value = id_input.value.trim().toUpperCase();
    id_input.value = siphoned_value;

    if (siphoned_value.length != 6) { return span_text.innerText = 'Code must be 6 characters'; }

    span_text.innerText = "Looking for id code";

    try {
        const doc = await find_user_doc(siphoned_value);

        span_text.innerText = `Fantastic, welcome ${doc.data().name}!`;
    
        // Horrible security I know but this is a school's coding club so what do I care.
        window.localStorage.setItem('doc_id', doc.id);
    
        window.location.href = '../dashboard'
    } catch (e) {
        console.error(e);
        return span_text.innerText = 'Couldn\'t find anyone with that code'; 
    }
}

async function find_user_doc(id_code) {
    const id_query = query(collection(db, "users"), where("code", "==", id_code));
    return (await getDocs(id_query)).docs[0];
}

id_input.oninput = () => {
    if (id_input.value.length == 0) {
        span_text.innerText = "identifier";
    }
}