document.addEventListener('DOMContentLoaded', () => {
    let theme = localStorage.getItem('theme');

    if (theme == 'dark') {
        setDark();
    }

    else if (theme == 'light') {
        setLight();
    }

    document.getElementById('theme').onclick = () => {
        theme = localStorage.getItem('theme');
        theme == 'light' ? setDark() : setLight();
    };

    function setDark() {
        localStorage.setItem('theme', 'dark');
        document.getElementById('dark').href = '/assets/css/dark.css';
    }

    function setLight() {
        localStorage.setItem('theme', 'light');
        document.getElementById('dark').href = '';
    }
});

