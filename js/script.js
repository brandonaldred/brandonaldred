const menuIcon = document.querySelector('.menu');
const mainContent = document.getElementById('main-content');

function menuClear() {
    const navContainer = document.getElementById('nav-container');
    navContainer.className = 'hide';
    menuIcon.className = 'menu';
    mainContent.classList.remove('blur');
}

menuIcon.addEventListener('click', ()=> {
    const navContainer = document.getElementById('nav-container');
    if (navContainer.className === 'hide') {
        navContainer.className = 'nav-show';
        menuIcon.className = 'menu selected';
        mainContent.className = 'blur';
        mainContent.addEventListener('click', () => {
            menuClear();
        });
    } else {
        menuClear();
    }
});