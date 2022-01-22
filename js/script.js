const menuIcon = document.querySelector('.menu');
const mainContent = document.getElementById('main-content');

window.addEventListener("resize", function(){
    const navContainer = document.getElementById('nav-container');
    if (window.innerWidth >= 700) {
        navContainer.className = 'nav-show-wide';
    } else { navContainer.className = 'hide'; }
  });

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