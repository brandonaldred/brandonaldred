const menuIcon = document.querySelector('.menu');
const mainContent = document.getElementById('main-content');

function menuClear() {
    const navContainer = document.querySelector('.nav-container');
    navContainer.style.display = 'none';
    menuIcon.className = 'menu';
    mainContent.classList.remove('blur');
}

menuIcon.addEventListener('click', ()=> {
    const navContainer = document.querySelector('.nav-container');
    if (navContainer.style.display === 'none') {
        navContainer.style.display = 'flex';
        menuIcon.className = 'menu selected';
        mainContent.className = 'blur';
        mainContent.addEventListener('click', () => {
            menuClear();
        });
    } else {
        menuClear();
    }
});