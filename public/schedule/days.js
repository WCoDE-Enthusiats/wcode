const current_date = new Date(Date.now());
const month = current_date.getMonth();
const year = current_date.getFullYear();
const is_leap_year = year % 4 == 0 && year % 100 != 100;
const date = current_date.getDate();
const day_of_week_at_date = current_date.getDay();
const days_in_month = (month) => month == 1 ? (is_leap_year ? 29 : 28) : (month > 6 ? (month % 2 == 0 ? 30 : 31) : (month % 2 == 0 ? 31 : 30));


console.log(days_in_month(month));

// yoga
let date_array = [];
// const offset = 1 + day_of_week_at_date - date % 7;
// for (let i = 0; i < 35; i++) {
//     const rel_pos = i - offset;

//     if (rel_pos < 0) {
//         date_array.push(days_in_month(month - 1 < 0 ? 11 : month - 1) + rel_pos);
//     } else if (rel_pos < days_in_month(month)) {
//         date_array.push(rel_pos);
//     } else {
//         date_array.push((rel_pos - days_in_month(month)) % days_in_month(month + 1));
//     }

//     date_array[i] += 1; // ` ${rel_pos} < ${days_in_month(month)}`
// }
// console.log(date_array);

//micheal
let a_day = date;
while (a_day > 7) {
    a_day -= 7;
}

let doom = day_of_week_at_date + 8 - a_day;
doom = doom > 6 ? doom - 7 : doom;
let x = days_in_month(month - 1) - doom;

console.log(doom);

if (doom != 0) {
    for (let i = 0; i < doom; i++) {
        while (x != days_in_month(month - 1) + 1) {
            date_array.push(x + i);
        }
    }
    
    for (let i = 1; i < days_in_month(month) + 1; i++) {
        date_array.push(i);
    }
} else {
    for (let i = 1; i < days_in_month(month) + 1; i++) {
        date_array.push(i);
    }
}

const days_left = 35 - date_array.length;
console.log(days_left);

for (let i = 1; i < days_left + 1; i++) {
        date_array.push(i);
}

console.log(date_array)