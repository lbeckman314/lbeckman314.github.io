document.addEventListener('DOMContentLoaded', () => {
    let pics = document.getElementsByClassName("grid-item");
    if (pics.length == 0)
        return;

    let pic;
    let div;
    let content = document.getElementById('content');
    let exitBtn = document.createElement('div');
    exitBtn.innerText = '✕';
    exitBtn.classList.add('exit-button');
    exitBtn.onclick = () => div.remove();
    
    for (i in pics) {
        pic = pics[i];
        pic.onclick = (e) => {
            div = document.createElement('div');
            div.classList.add('fullscreen-container');
            
            let img = document.createElement('img');
            img.src = e.target.src;

            div.appendChild(img);
            div.appendChild(exitBtn);
            content.appendChild(div);
        }
    }

    window.addEventListener('keydown', (e) => {
        e = e || window.event;
        let key = e.key;
        console.log('key: ', key);
        if (key == 'Escape') {
            div.remove();
        }
    });
});
