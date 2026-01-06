const figure_container = document.getElementById("figure_container");
const alston_pane = figure_container.children[0];
const yapheth_pane = figure_container.children[1];
const adrian_pane = figure_container.children[2];

let offset = 0;
let gallery_scroll = 0;
let is_manual_scrolling_gallery = false;

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

const gallery_wrapper = document.getElementById("gallery_wrapper");
const intersection_options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2
};
const gallery_callback = (entries, observer) => { entries.forEach(element => {
    if (!element.isIntersecting) return;

    gallery_wrapper.style.transform = "translateY(0px)";
    gallery_wrapper.style.opacity = "1";
});};
const gallery_observer = new IntersectionObserver(gallery_callback, intersection_options);
gallery_observer.observe(gallery_wrapper);

const dots = document.getElementsByClassName('dot');
const dot_width = dots[0].clientWidth;

let manual_gallery_scroll = 0;

gallery_wrapper.onscroll = () => {
    manual_offset = gallery_wrapper.scrollLeft - gallery_scroll;

    if (manual_offset != 0) {
        manual_gallery_scroll = manual_offset;
        console.log(manual_gallery_scroll);
    }

    for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        dot.style.backgroundPosition = `${dot_width * (((offset * 20 + manual_gallery_scroll) % gallery_wrapper.scrollWidth)/window.innerWidth - i)}px`;
    }
};
    
window.onscroll = () => {
    offset = window.scrollY/10;

    alston_pane.style.transform = `translate(-${offset}px, -${offset}px) rotate(-${offset/10}deg)`;
    yapheth_pane.style.transform = `translate(${offset/2}px, -${offset * 1.5}px) rotate(${offset/20}deg)`;
    adrian_pane.style.transform = `translate(${offset}px, -${offset}px) rotate(${offset/10}deg)`;

    const opacity_linger = 20;
    alston_pane.style.opacity = opacity_linger/offset;
    yapheth_pane.style.opacity = opacity_linger/offset;
    adrian_pane.style.opacity = opacity_linger/offset;
    
    gallery_scroll = (offset * 20 + manual_gallery_scroll) % gallery_wrapper.scrollWidth;

    gallery_wrapper.scrollLeft = gallery_scroll;
};


const language_scroll_wrapper = document.getElementById("language_scroll_wrapper");
const language_squares = document.getElementsByClassName("programming_square");
const language_articles = document.getElementById("language_description_container").children;
let current_language = 0; // 0 python, 1 cplusplus, 2 javascript
update_language();
language_scroll_wrapper.onscroll = () => {
    const language_progres = 4 * language_scroll_wrapper.scrollLeft/language_scroll_wrapper.scrollWidth;
    console.log(current_language);

    if (language_progres >= 2) {
        if (current_language != 2) {
            current_language = 2;
            update_language();
        }
    } else if (language_progres >= 1) {
        if (current_language != 1) {
            current_language = 1;
            update_language();
        }
    } else if (language_progres >= 0) {
        if (current_language != 0) {
            current_language = 0;
            update_language();
        }
    }
}

function update_language () {
    for (let i = 0; i < 3; i++) {
        if (i == current_language) {
            language_squares[i].style.transform = "translateY(50%)";
            language_articles[i].style.opacity = "1";
        } else {
            language_squares[i].style.transform = "translateY(0%)";
            language_articles[i].style.opacity = "0";
        }
        
        language_articles[i].style.transform = `translateX(-${i}00%)`
    }
}