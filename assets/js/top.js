window.onscroll = () => {
    let scroll = $(window).scrollTop();
    if (scroll > 3000) {
        document.getElementsByClassName("circle")[0].classList.remove('fade-out');
    }
    else {
        document.getElementsByClassName("circle")[0].classList.add('fade-out');
    }
}

