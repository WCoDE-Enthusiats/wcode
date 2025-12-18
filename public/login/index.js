window.onkeydown = (event) => { if (event.key == 'Enter') login(); };

const id_input = document.getElementById('id_input');
const span_text = document.getElementById("span_text");
async function login () {
    const siphoned_value = id_input.value.trim().toUpperCase();
    id_input.value = siphoned_value;

    if (id_input.length != 8) { return span_text.value = 'Code must be 8 characters'; }

    const response = await fetch('/.netlify/functions/login', {
        method: 'POST',
        body: JSON.stringify({
            id_code: siphoned_value
        })
    })
        .then(response => response.json());

    if (response.message == 'user not found') { return span_text.innerText = 'Couldn\'t find anyone with that code'; }
    if (response.message == 'Yep that guy exists in our database!') { span_text.innerText = 'Fantastic, welcome!'; }

    window.localStorage.setItem('id_code', siphoned_value);
    window.location.href = '../dashboard'
}