document.addEventListener('DOMContentLoaded', () => {
    imagesLoaded('#grid', function () {
        let elem = document.querySelector('.grid');
        console.log(elem);
        let _ = new Masonry(elem, {
            itemSelector: '.grid-item',
            columnWidth: 0,
            fitWidth: true,
        });
    })
});
