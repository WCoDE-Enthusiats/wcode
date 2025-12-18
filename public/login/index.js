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