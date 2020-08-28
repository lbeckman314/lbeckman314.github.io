// https://stackoverflow.com/questions/22581345/click-button-copy-to-clipboard-using-jquery
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementsByTagName('div');
    Array.from(container).forEach((element) => {
        if (element.className == 'highlight')
            createCopyBtn(element);
    });
});

function createCopyBtn(element) {
    let copyContainer = document.createElement('div');
    copyContainer.className = 'copyContainer';

    let copySymbol = document.createElement('span');
    copySymbol.className = 'copySymbol';
    copySymbol.innerHTML = '⧉';
    copySymbol.title = 'Copy to clipboard';
    copyContainer.appendChild(copySymbol);

    let copyMessage = document.createElement('p');
    copyMessage.className = 'copyMsg hide';
    copyMessage.innerHTML = 'Copied!';
    copyContainer.appendChild(copyMessage);

    // Insert <li> before the first child of <ul>
    element.insertBefore(copyContainer, element.childNodes[0]);

    const copyMsg = copySymbol.parentElement.children[1];

    copySymbol.addEventListener('click', () => {
        const content = copySymbol.parentElement.parentElement.children[1].textContent;
        copy(content);
        copyMsg.classList.remove('hide');
    });

    copySymbol.addEventListener('mouseout', () => copyMsg.classList.add('hide'));
}

function copy(text){
    const tmp = document.createElement('textarea');
    tmp.textContent = text;

    const body = document.getElementsByTagName('body')[0];
    body.appendChild(tmp);

    tmp.select();
    document.execCommand('copy');
    tmp.remove();
}

