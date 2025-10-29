document.addEventListener('DOMContentLoaded', () => {
    imagesLoaded('#grid', function () {
        console.log('all images are loaded');
        var elem = document.querySelector('.grid');
        console.log(elem);
        var msnry = new Masonry(elem, {
            // options
            itemSelector: '.grid-item',
            columnWidth: 0,
            fitWidth: true,
        });
    })
});