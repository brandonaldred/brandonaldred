const optionSelect = document.querySelector('.option');
const optionBox = document.querySelector('.options');

const options = document.querySelectorAll('.option-item');
for (let i = 0; i < options.length; i++) {
    options[i].addEventListener('click', () => {
        collapse(options[i].innerText);
    });
}


optionSelect.addEventListener('click', () => {
    optionBox.classList.remove('collapsed');
    optionBox.classList.add('expanded');
    optionBox.querySelector('DIV').classList.remove('option-hide');
    optionSelect.querySelector('IMG').classList.add('inverted');
});


function collapse(option) {
    const p = optionSelect.querySelector('P');
    p.innerText = '';
    if (p.className === 'select') {
        p.classList.remove('select');
        p.classList.add('selected');
    }
    optionSelect.querySelector('IMG').classList.remove('inverted');
    optionBox.querySelector('DIV').classList.add('option-hide');
    p.innerText = option;
}