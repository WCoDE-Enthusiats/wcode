const glitch_text = document.getElementById("glitch_text");
const the_alphabet = "QWERTYUIOPASGHJKLZXCBNMqwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*()-=[]\;',._+{|:<>";

const bounding_rect = glitch_text.getBoundingClientRect();
const glitch_container = document.getElementById("glitch_container");
let last_update_time = Date.now() - 1000;
glitch_container.onmousemove = (e) => {
    const last_update_delta = Date.now() - last_update_time;
    if (last_update_delta < 1000/20) { return }
    last_update_time = Date.now();

    let new_text = ""

    for (let i = 0; i < 10000; i++) {
        new_text += the_alphabet[Math.floor(Math.random() * the_alphabet.length)] + " ";
    }

    glitch_text.innerText = new_text;

    const x_pos = e.clientX - bounding_rect.left;
    const y_pos = e.clientY - bounding_rect.top;

    glitch_text.style.setProperty('--x', `${x_pos}px`);
    glitch_text.style.setProperty('--y', `${y_pos}px`);
}

// let current_size = 0;
// let target_size = 0;
// glitch_container.onmouseenter = () => { target_size = 250; };
// glitch_container.onmouseleave = () => { target_size = 0; };

// update_size();
// function update_size () {
//     current_size += (target_size - current_size) / 2;
//     glitch_text.style.setProperty('--size', `${current_size}px`);
    
//     requestAnimationFrame(update_size);
// }
const back_h1 = document.getElementById("back_h1");
document.getElementById("id_input").onfocus = () => { back_h1.style.opacity = "0.3"; };
document.getElementById("id_input").onblur = () => { back_h1.style.opacity = "0"; };