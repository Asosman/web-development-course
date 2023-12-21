const mobileView = document.querySelector('.mobile-icon');
const navBar = document.querySelector('.side-drawer');

mobileView.addEventListener('click',function(){
    navBar.classList.toggle('open');
})