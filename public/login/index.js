window.onkeydown = (event) => { if (event.key == 'Enter') login(); };

const id_input = document.getElementById('id_input');
const span_text = document.getElementById("span_text");
async function login () {
    const siphoned_value = id_input.value.trim().toUpperCase();
    id_input.value = siphoned_value;

    if (siphoned_value.length != 6) { return span_text.innerText = 'Code must be 6 characters'; }

    span_text.innerText = "Looking for id code";
    const response = await fetch('/.netlify/functions/login', {
        method: 'POST',
        body: JSON.stringify({
            id_code: siphoned_value
        })
    })
        .then(response => response.json());

    if (response.message == 'user not found') { return span_text.innerText = 'Couldn\'t find anyone with that code'; }
    
    span_text.innerText = 'Fantastic, welcome!';

    window.localStorage.setItem('id_code', siphoned_value);
    window.localStorage.setItem('name', response.user_info.name);
    window.localStorage.setItem('subject', response.user_info.subject);
    window.localStorage.setItem('role', response.user_info.role);

    window.location.href = '../dashboard'
}

const glitch_text = document.getElementById("glitch_text");
const the_alphabet = "QWERTYUIOPASGHJKLZXCBNMqwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*()-=[]\;',._+{|:<>";

const glitch_container = document.getElementById("glitch_container");
glitch_container.onmousemove = (e) => {
    let new_text = ""

    for (let i = 0; i < 10000; i++) {
        new_text += the_alphabet[Math.floor(Math.random() * the_alphabet.length)] + " ";
    }

    glitch_text.innerText = new_text;

    const bounding_rect = glitch_text.getBoundingClientRect();
    const x_pos = e.clientX - bounding_rect.left;
    const y_pos = e.clientY - bounding_rect.top;

    glitch_text.style.setProperty('--x', `${x_pos}px`);
    glitch_text.style.setProperty('--y', `${y_pos}px`);
}

let current_size = 0;
let target_size = 0;
glitch_container.onmouseenter = () => { target_size = 250; };
glitch_container.onmouseleave = () => { target_size = 0; };

update_size();
function update_size () {
    current_size += (target_size - current_size) / 2;
    glitch_text.style.setProperty('--size', `${current_size}px`);
    
    requestAnimationFrame(update_size);
}
const back_h1 = document.getElementById("back_h1");
document.getElementById("id_input").onfocus = () => { back_h1.style.opacity = "0.3"; };
document.getElementById("id_input").onblur = () => { back_h1.style.opacity = "0"; };