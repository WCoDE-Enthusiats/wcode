const current_date = new Date(Date.now());
const month = current_date.getMonth();
const year = current_date.getFullYear();
const is_leap_year = year % 4 == 0 && year % 100 != 100;
const date = current_date.getDate();
const day_of_week_at_date = current_date.getDay();
const days_in_month = (month) => month == 1 ? (is_leap_year ? 29 : 28) : (month > 6 ? (month % 2 == 0 ? 30 : 31) : (month % 2 == 0 ? 31 : 30));

// yoga
let date_array = [];
const offset = 1 + day_of_week_at_date - date % 7;
for (let i = 0; i < 35; i++) {
    const rel_pos = i - offset;

    if (rel_pos < 0) {
        date_array.push(days_in_month((month + 11) % 12) + rel_pos);
    } else if (rel_pos < days_in_month(month)) {
        date_array.push(rel_pos);
    } else {
        date_array.push((rel_pos - days_in_month(month)) % days_in_month(month + 1));
    }

    date_array[i] += 1; // ` ${rel_pos} < ${days_in_month(month)}`
}

date_array.forEach((date) => {
    const div = document.createElement('div');
    const span = document.createElement('span');
    const cover = document.createElement('div');
    
    div.classList.add('numberedDays', 'dayContainer');
    cover.classList.add('dayCover');
    span.innerText = date;

    div.appendChild(span);
    div.appendChild(cover);
    document.getElementById('days').appendChild(div);
});

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

const earliest_year = offset > 0 && month == 0 ? year - 1 : year;
const earliest_month = offset > 0 ? (month + 11) % 12 : month;
const earliest_date = new Date(earliest_year, earliest_month, date_array[0]);
const latest_year = offset < 35 && month == 11 ? year + 1 : year;
const latest_month = offset < 35 ? (month + 1) % 12 : month;
const latest_date = new Date(latest_year, latest_month, date_array[date_array.length - 1]);
const snapshot = await getDocs(query(collection(db, "schedule"), where("date", ">=", earliest_date), where("date", "<=", latest_date)));
const numberedDays = document.getElementsByClassName("numberedDays");
const eventHeader_span = document.getElementById("eventHeader").children[0];
const aside_article = document.getElementsByTagName("aside")[0].children[1];
const event_location = aside_article.children[0];
const event_time = aside_article.children[1];
const event_details = aside_article.children[2];
snapshot.forEach((doc) => {
    const event_data = doc.data();
    console.log(event_data);
    const event_month = event_data.date.toDate().getMonth();
    const event_date = event_data.date.toDate().getDate();
    
    const scheduled_date = numberedDays[get_scheduled_date_div_index(event_month, event_date)];
    console.log(scheduled_date);

    switch (event_data.subject) {
        case "javascript": { scheduled_date.setAttribute("data-subject", "javascript"); break; }
        case "python": { scheduled_date.setAttribute("data-subject", "python"); break; }
        case "cplusplus": { scheduled_date.setAttribute("data-subject", "cplusplus"); break; }
    }

    scheduled_date.onclick = () => {
        eventHeader_span.innerText = `${event_data.subject}  ${event_data.type}`;
        event_location.innerText = `Kelas XI-2`
        event_time.innerText = `${event_data.date.toDate().getHours()}:${(`${event_data.date.toDate().getMinutes()}`).padStart(2, '0')}`;
        event_details.innerText = event_data.details;
    }
});

function get_scheduled_date_div_index(event_month, event_date) {
    if (event_month == (month + 11) % 12) {
        return event_date - days_in_month(event_month) + offset;
    }

    if (event_month == month) {
        return event_date + offset - 1;
    }

    if (event_month == (month + 1)%12) {
        return event_date + offset - 1 + days_in_month(event_month);
    }
}


//micheal
// let a_day = date;
// while (a_day > 7) {
//     a_day -= 7;
// }

// let doom = day_of_week_at_date + 8 - a_day;
// doom = doom > 6 ? doom - 7 : doom;
// let x = days_in_month(month - 1) - doom;

// console.log(doom);

// if (doom != 0) {
//     for (let i = 0; i < doom; i++) {
//         while (x != days_in_month(month - 1) + 1) {
//             date_array.push(x + i);
//         }
//     }
    
//     for (let i = 1; i < days_in_month(month) + 1; i++) {
//         date_array.push(i);
//     }
// } else {
//     for (let i = 1; i < days_in_month(month) + 1; i++) {
//         date_array.push(i);
//     }
// }

// const days_left = 35 - date_array.length;
// console.log(days_left);

// for (let i = 1; i < days_left + 1; i++) {
//         date_array.push(i);
// }

// console.log(date_array)