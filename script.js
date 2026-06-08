var menuButton = document.querySelector('.menu-button');
var siteNav = document.querySelector('.site-nav');

if (menuButton && siteNav) {
  menuButton.addEventListener('click', function () {
    siteNav.classList.toggle('open');
  });
}

// Timeline — CSS :hover handles desktop; click toggles .open for touch
var timelineItems = document.querySelectorAll('.timeline-item');

for (var j = 0; j < timelineItems.length; j++) {
  timelineItems[j].addEventListener('click', function () {
    this.classList.toggle('open');
  });
}

// MANIA cards — CSS :hover handles desktop; click toggles .open for touch
var maniaCards = document.querySelectorAll('.mania-card');

for (var k = 0; k < maniaCards.length; k++) {
  maniaCards[k].addEventListener('click', function () {
    this.classList.toggle('open');
  });
}

// Map — event delegation on the whole map section
var fakeMap = document.querySelector('.fake-map');
var mapNote = document.querySelector('#map-note');

var mapText = {
  west: {
    title: 'West Berlin',
    body: 'Backed by the U.S., Britain, and France, West Berlin became a symbol of capitalist democracy sitting right inside communist East Germany. The Soviets hated what it represented: a prosperous Western city that East Germans could see and sometimes defect into.'
  },
  east: {
    title: 'East Berlin',
    body: 'The capital of East Germany, controlled by the communist SED party and backed by the Soviet Union. Life here meant Stasi informants, restricted travel, state-controlled media, and the constant visibility of the Wall as a reminder of what the government was willing to do to keep people in.'
  },
  gate: {
    title: 'Brandenburg Gate',
    body: 'The Wall ran right past the Brandenburg Gate, cutting it off entirely. For 28 years it sat in no-man\'s land between East and West. Nobody from either side could get near it. Reagan gave his "tear down this wall" speech a few hundred meters away in 1987. When the Wall fell in 1989, it was the first place crowds gathered.'
  },
  kennedy: {
    title: 'Kennedy\'s Visit, 1963',
    body: 'Two years after the Wall went up, JFK came to West Berlin and gave one of the most famous speeches of the Cold War. "Ich bin ein Berliner" (I am a Berliner) was a direct statement that the U.S. stood with West Berlin. The crowd was enormous. It turned a divided city into a symbol of the entire Western alliance.'
  },
  wall: {
    title: 'The Wall',
    body: '155 km total length. Up to 3.6 meters tall. It was not just one wall. It was a system: inner wall, a floodlit death strip, outer wall, watchtowers every 300 meters, tripwires, and guard dogs. Built overnight starting August 13, 1961. Over 100 people died trying to cross it.'
  },
  stasi: {
    title: 'Stasi Headquarters',
    body: 'The Stasi, East Germany\'s secret police, was one of the most pervasive surveillance operations in history. By 1989 they had files on roughly 1 in 3 East German adults. Neighbors reported on neighbors, colleagues on colleagues, sometimes spouses on each other. The Wall kept people in physically; the Stasi kept them in psychologically.'
  },
  deathstrip: {
    title: 'The Death Strip',
    body: 'The open stretch between the inner and outer walls, designed to make escape impossible. Floodlit at night, raked smooth so footprints were visible, monitored from watchtowers with guards under shoot-on-sight orders. Mined in some sections. Over 5,000 people attempted to cross it anyway.'
  },
  checkpoint: {
    title: 'Checkpoint Charlie',
    body: 'The most famous crossing point between East and West Berlin, used by foreign nationals and military personnel. In October 1961, just two months after the Wall went up, American and Soviet tanks faced each other here in a 16-hour standoff that nearly became direct military conflict. It became the most photographed symbol of the divided city.'
  }
};

var mapDefault = {
  title: 'Berlin, 1961-1989',
  body: 'Hover over any part of the map to see what made it significant.'
};

if (fakeMap && mapNote) {
  fakeMap.addEventListener('mouseover', function (e) {
    var target = e.target.closest('[data-map]');
    if (target) {
      var key = target.getAttribute('data-map');
      if (mapText[key]) {
        mapNote.innerHTML = '<h2>' + mapText[key].title + '</h2><p>' + mapText[key].body + '</p>';
      }
    }
  });

  fakeMap.addEventListener('mouseleave', function () {
    mapNote.innerHTML = '<h2>' + mapDefault.title + '</h2><p>' + mapDefault.body + '</p>';
  });

  fakeMap.addEventListener('click', function (e) {
    var target = e.target.closest('[data-map]');
    if (target) {
      var key = target.getAttribute('data-map');
      if (mapText[key]) {
        mapNote.innerHTML = '<h2>' + mapText[key].title + '</h2><p>' + mapText[key].body + '</p>';
      }
    }
  });
}

var quizOptions = document.querySelectorAll('.quiz-option');
var quizResponse = document.querySelector('#quiz-response');

for (var q = 0; q < quizOptions.length; q++) {
  quizOptions[q].addEventListener('click', function () {
    var correct = this.getAttribute('data-correct') === 'true';
    if (!quizResponse) return;
    quizResponse.classList.add('show');
    if (correct) {
      quizResponse.textContent = 'Correct. The comparison works best when you explain both the similarity and the difference.';
    } else {
      quizResponse.textContent = 'Not quite. The stronger answer is that the walls are different, but both became symbols in political debates.';
    }
  });
}

// ---------------------------------------------------------------
// Wikimedia Commons image loader
// Resolves data-wiki filenames to real upload URLs in one API call
// ---------------------------------------------------------------
function loadWikiImages() {
  var imgEls = Array.from(document.querySelectorAll('img[data-wiki]'));
  var heroBg = document.querySelector('[data-wiki-bg]');

  var filenames = imgEls.map(function (el) { return el.getAttribute('data-wiki'); });
  if (heroBg) filenames.push(heroBg.getAttribute('data-wiki-bg'));
  if (filenames.length === 0) return;

  var titles = filenames.map(function (f) { return 'File:' + f; }).join('|');
  var apiUrl = 'https://commons.wikimedia.org/w/api.php'
    + '?action=query'
    + '&titles=' + encodeURIComponent(titles)
    + '&prop=imageinfo'
    + '&iiprop=url'
    + '&iiurlwidth=1200'
    + '&format=json'
    + '&origin=*';

  fetch(apiUrl)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var urlMap = {};
      Object.keys(data.query.pages).forEach(function (id) {
        var page = data.query.pages[id];
        if (page.imageinfo && page.imageinfo[0]) {
          var name = page.title.replace(/^File:/, '');
          urlMap[name] = page.imageinfo[0].thumburl || page.imageinfo[0].url;
        }
      });

      imgEls.forEach(function (img) {
        var name = img.getAttribute('data-wiki');
        if (urlMap[name]) {
          img.src = urlMap[name];
          img.removeAttribute('onerror');
        } else {
          var wrap = img.closest('figure') || img.closest('.tl-img-wrap');
          if (wrap) wrap.style.display = 'none';
        }
      });

      if (heroBg) {
        var name = heroBg.getAttribute('data-wiki-bg');
        if (urlMap[name]) {
          heroBg.style.backgroundImage =
            'linear-gradient(rgba(0,0,0,0.42), rgba(0,0,0,0.72)), url(' + urlMap[name] + ')';
        }
      }
    })
    .catch(function () {
      // API unreachable — fall back to CSS gradient for bg, hide unloaded imgs
      imgEls.forEach(function (img) {
        var wrap = img.closest('figure') || img.closest('.tl-img-wrap');
        if (wrap && !img.src) wrap.style.display = 'none';
      });
    });
}

loadWikiImages();
