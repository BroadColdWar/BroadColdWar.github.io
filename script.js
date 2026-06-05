var menuButton = document.querySelector('.menu-button');
var siteNav = document.querySelector('.site-nav');

if (menuButton && siteNav) {
  menuButton.addEventListener('click', function () {
    siteNav.classList.toggle('open');
  });
}
