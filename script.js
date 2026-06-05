var menuButton = document.querySelector('.menu-button');
var siteNav = document.querySelector('.site-nav');

if (menuButton && siteNav) {
  menuButton.addEventListener('click', function () {
    siteNav.classList.toggle('open');
  });
}

var revealButtons = document.querySelectorAll('.reveal-button');

for (var i = 0; i < revealButtons.length; i++) {
  revealButtons[i].addEventListener('click', function () {
    var answer = this.parentElement.querySelector('.hidden-answer');
    if (answer) {
      answer.classList.toggle('show');
    }
  });
}

var timelineItems = document.querySelectorAll('.timeline-item');

for (var j = 0; j < timelineItems.length; j++) {
  timelineItems[j].addEventListener('click', function () {
    this.classList.toggle('open');
  });
}

var maniaCards = document.querySelectorAll('.mania-card');

for (var k = 0; k < maniaCards.length; k++) {
  maniaCards[k].addEventListener('click', function () {
    this.classList.toggle('open');
  });
}

var mapButtons = document.querySelectorAll('.map-click');
var mapNote = document.querySelector('#map-note');

var mapText = {
  west: {
    title: 'West Berlin',
    body: 'West Berlin was backed by the Western Allies. It became a symbol of capitalist democracy inside communist East Germany, which made it politically valuable and vulnerable at the same time.'
  },
  east: {
    title: 'East Berlin',
    body: 'East Berlin was controlled by the East German communist government and supported by the Soviet Union. The Wall helped the government control movement and protect its image.'
  },
  checkpoint: {
    title: 'Checkpoint Charlie',
    body: 'Checkpoint Charlie was one of the most famous crossing points between East and West Berlin. It became a symbol of confrontation because soldiers, diplomats, and civilians all passed through or gathered around it.'
  }
};

for (var m = 0; m < mapButtons.length; m++) {
  mapButtons[m].addEventListener('click', function () {
    var section = this.getAttribute('data-map');
    if (mapNote && mapText[section]) {
      mapNote.innerHTML = '<h2>' + mapText[section].title + '</h2><p>' + mapText[section].body + '</p>';
    }
  });
}

var quizOptions = document.querySelectorAll('.quiz-option');
var quizResponse = document.querySelector('#quiz-response');

for (var q = 0; q < quizOptions.length; q++) {
  quizOptions[q].addEventListener('click', function () {
    var correct = this.getAttribute('data-correct') === 'true';

    if (!quizResponse) {
      return;
    }

    quizResponse.classList.add('show');

    if (correct) {
      quizResponse.textContent = 'Correct. The comparison works best when you explain both the similarity and the difference.';
    } else {
      quizResponse.textContent = 'Not quite. The stronger answer is that the walls are different, but both became symbols in political debates.';
    }
  });
}
