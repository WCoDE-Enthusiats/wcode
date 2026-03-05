window.onmousemove = (e) => {
    const x_pos = e.clientX;
    const y_pos = e.clientY;
    const rectangle = document.createElement("div");
    rectangle.setAttribute('class', 'trail');
    rectangle.style.width = "25px";
    rectangle.style.height = "25px";
    rectangle.style.zIndex = "99999";
    rectangle.style.position = "fixed";
    rectangle.style.top = y_pos - 5 + "px";
    rectangle.style.left = x_pos - 5 + "px";
    rectangle.style.opacity = 1;
    document.body.appendChild(rectangle);
}

animate()
function animate () {
    const particles = document.getElementsByClassName("trail");
    for(let i = 0; i < particles.length; i++){
        const particle = particles[i];
        const previous_y = parseInt(particle.style.top);
        particle.style.top = previous_y + 2 + "px";
        particle.style.opacity -= 0.01;
        
        if(particle.style.opacity == 0){
            particle.remove()
        }
    }

    requestAnimationFrame(animate)
}