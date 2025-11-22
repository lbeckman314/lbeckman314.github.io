document.addEventListener('DOMContentLoaded', () => {
    // Close the dropdown menu if the user clicks outside of it,
    // or hits the Escape key.
    let menu = document.getElementById('menu');
    let drop = document.getElementById('drop-button');

    drop.addEventListener('click', (e) => {
        menu.style.display = menu.style.display == 'block' ? '' : 'block';
    });

    window.addEventListener('click', (e) => {
        if (!e.target.matches('#drop-button')) {
            menu.style.display = '';
        }
    });

    window.addEventListener('keydown', (e) => {
        e = e || window.event;
        let key = e.key;
        if (key == 27) {
            menu.style.display = '';
        }
    });
});
