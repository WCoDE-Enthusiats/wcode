console.log("ready");

document.getElementById("fetch-btn").onclick = async () => {
    console.log("fetching")

    const response = await fetch('/.netlify/functions/login', {
        method: 'POST',
        body: JSON.stringify({
            id_code: 'FAFAFAFA'
        })
    })
        .then(response => response.json());

    document.getElementById('response-output').innerText = response.message;
}