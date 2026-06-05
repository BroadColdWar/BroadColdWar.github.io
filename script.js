const menuButton = document.querySelector('#menuButton');
const navLinks = document.querySelector('#navLinks');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

const timelineCards = document.querySelectorAll('.time-card');
const timelineDetail = document.querySelector('#timelineDetail');

if (timelineCards.length && timelineDetail) {
  timelineCards.forEach((card) => {
    card.addEventListener('click', () => {
      const year = card.querySelector('span').textContent;
      const title = card.querySelector('strong').textContent;

      timelineDetail.innerHTML = `
        <strong>${year}: ${title}</strong>
        <p class="empty-text">Add the explanation for this event here.</p>
      `;
    });
  });
}

const mapPins = document.querySelectorAll('.map-pin');
const mapNote = document.querySelector('#mapNote');

if (mapPins.length && mapNote) {
  mapPins.forEach((pin) => {
    pin.addEventListener('click', () => {
      mapNote.textContent = `Notes for map point ${pin.textContent}. Replace this with your research.`;
    });
  });
}
