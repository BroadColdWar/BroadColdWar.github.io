var menuButton = document.querySelector('.menu-button');
var siteNav = document.querySelector('.site-nav');

if (menuButton && siteNav) {
  menuButton.addEventListener('click', function () {
    siteNav.classList.toggle('open');
  });
}

var revealButton = document.querySelector('.reveal-button');
var hiddenAnswer = document.querySelector('.hidden-answer');

if (revealButton && hiddenAnswer) {
  revealButton.addEventListener('click', function () {
    hiddenAnswer.classList.toggle('show');
  });
}

var timelineItems = document.querySelectorAll('.timeline-item');

for (var i = 0; i < timelineItems.length; i++) {
  timelineItems[i].addEventListener('click', function () {
    this.classList.toggle('open');
  });
}
