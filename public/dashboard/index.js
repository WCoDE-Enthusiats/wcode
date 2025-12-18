let id_code = window.localStorage.getItem('id_code');
if (id_code == null) { window.location.href = '../login'; }

let name = window.localStorage.getItem('name');
document.getElementById('baby').innerText = `Oh hi ${name}`;
if (name == null) {
    const response = await fetch('/.netlify/functions/login', {
        method: 'POST',
        body: JSON.stringify({
            id_code: id_code
        })
    })
        .then(response => response.json());

    if (response.message == 'user not found') {
        window.localStorage.removeItem('id_code');
        window.location.href = '../login';
    }
    
    window.localStorage.setItem('name', response.user_info.name);
    name = window.localStorage.getItem('name');
    document.getElementById('baby').innerText = `Oh hi ${name}`;
}