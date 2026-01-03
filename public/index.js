const figure_container = document.getElementById("figure_container");
const alston_pane = figure_container.children[0];
const yapheth_pane = figure_container.children[1];
const adrian_pane = figure_container.children[2];

window.onscroll = () => {
    console.log(window.scrollY);
    const offset = window.scrollY/10;

    alston_pane.style.transform = `translate(-${offset}px, -${offset}px) rotate(-${offset/10}deg)`;
    yapheth_pane.style.transform = `translate(${offset/2}px, -${offset * 1.5}px) rotate(${offset/20}deg)`;
    adrian_pane.style.transform = `translate(${offset}px, -${offset}px) rotate(${offset/10}deg)`;

    const opacity_linger = 20;
    alston_pane.style.opacity = opacity_linger/offset;
    yapheth_pane.style.opacity = opacity_linger/offset;
    adrian_pane.style.opacity = opacity_linger/offset;
};

/*
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
*/