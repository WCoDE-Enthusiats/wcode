const current_date = new Date(Date.now());
const month = current_date.getMonth();
const year = current_date.getFullYear();
const is_leap_year = year % 4 == 0 && year % 100 != 100;
const days_in_month = (month) => month == 1 ? (is_leap_year ? 29 : 28) : (month > 6 ? (month % 2 == 0 ? 30 : 31) : (month % 2 == 0 ? 31 : 30));
const date = current_date.getDate();
const day_of_week_at_date = current_date.getDay();
const date_offset = date % 7 - day_of_week_at_date + 1;
if (date_offset < 0) date_offset = 1 - date_offset;
console.log(`date: ${date}, day of week ${day_of_week_at_date}, offset: ${date_offset}, no of days this month ${days_in_month(month)}, no of days last month ${days_in_month(month - 1)}`);

for (let i = 0; i < 35; i++) {
    let relative_date = (i - date_offset);
    relative_date = relative_date < 0 ? days_in_month(month - 1) + relative_date + 1 : relative_date % days_in_month(month) + 1;

    const div = document.createElement('div');
    const span = document.createElement('span');
    const cover = document.createElement('div');

    div.classList.add('numberedDays', 'dayContainer');
    cover.classList.add('dayCover');
    span.innerText = relative_date;
    if (i - date_offset < 0 || i - date_offset > days_in_month(month) - 1) {
        div.style.color = 'rgb(67, 78, 85)';
    }

    div.appendChild(span);
    div.appendChild(cover);
    document.getElementById('days').appendChild(div);
}