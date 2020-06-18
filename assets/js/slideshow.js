let slideIndex = 1;
showSlides(slideIndex);

function changeSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    if (n > slides.length)
        slideIndex = 1;

    if (n < 1)
        slideIndex = slides.length;

    for (let i = 0; i < slides.length; i++)
        slides[i].style.display = "none";

    if (slideIndex > slides.length)
        slideIndex = 1;

    slides[slideIndex - 1].style.display = "block";
}

document.addEventListener('keydown', (ev) => {
    if (ev.keyCode == 39)
        changeSlides(1);

    else if (ev.keyCode == 37)
        changeSlides(-1);
});

