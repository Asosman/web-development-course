const mobileMenuBtnElement = document.getElementById('mobile-nav__menu')
const mobileMenuElement = document.getElementById('mobile-menu');


function toggleMobileMenu(){

    mobileMenuElement.classList.toggle('open');
}

mobileMenuBtnElement.addEventListener('click', toggleMobileMenu);