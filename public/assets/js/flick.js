document.addEventListener('DOMContentLoaded', () => {
    var elem = document.querySelector('.main-carousel');
    var flkty = new Flickity(elem, {
        // options
        contain: true,
        wrapAround: true,
        fade: true,
    });
});