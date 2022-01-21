const menuIcon = document.querySelector('.menu');
menuIcon.addEventListener('click', ()=> {
    const navContainer = document.querySelector('.nav-container');
    if (navContainer.style.display === 'none') {
        navContainer.style.display = 'flex';
        menuIcon.className = 'menu selected';
    } else {
        navContainer.style.display = 'none';
        menuIcon.className = 'menu';
    }
});