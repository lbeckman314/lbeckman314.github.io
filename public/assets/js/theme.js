document.addEventListener('DOMContentLoaded', () => {
    let theme = localStorage.getItem('theme');
    const themeButton = document.getElementById('theme');
    const themeElement = document.documentElement;

    if (theme == 'dark') {
        setTheme('dark');
    }
    else if (theme == 'light') {
        setTheme('light');
    }
    else {
        const osDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(osDark ? 'dark' : 'light');
    }

    themeButton.onclick = () => {
        let currentTheme = localStorage.getItem('theme');
        const theme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(theme);
    };

    function setTheme(theme) {
        localStorage.setItem('theme', theme);
        if (theme == 'dark') {
            themeElement.classList.add('dark');
        } 
        else {
            themeElement.classList.remove('dark');
        }
    }
});
