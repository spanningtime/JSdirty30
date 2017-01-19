'use strict';

var keyCodes = [{ keycode: 89, drumType: 'open high hat' }, { keycode: 85, drumType: 'tom' }, { keycode: 73, drumType: 'tom' }, { keycode: 79, drumType: 'ride' }, { keycode: 72, drumType: 'hi hat' }, { keycode: 74, drumType: 'floor tom' }, { keycode: 75, drumType: 'floor tom' }, { keycode: 78, drumType: 'snare' }, { keycode: 77, drumType: 'kick' }];

var purpLine = document.getElementById('purp');
var greenLine = document.getElementById('green');
var yellowLine = document.getElementById('yellow');
var lines = document.getElementsByClassName('line');
var drums = document.getElementById('drums-container');
var allDrums = document.querySelectorAll('.drum');
var drumName = document.getElementById('drum-name');
var directions = document.getElementById('directions');
var bangDrumsVoice = document.getElementById('bangDrumsVoice');
var numberOfClicks = 0;
var lastClick = void 0;
var intervalID = void 0;

window.onresize = function () {
  return directions.innerHTML = "bang them drums";
};

window.onload = bangDrumsVoice.play();

//To avoid having multiple intervals started this only starts an interval after the first click or keydown.
var checkToStartInterval = function checkToStartInterval() {
  numberOfClicks < 2 ? startInterval() : null;
};

var startInterval = function startInterval() {
  intervalID = window.setInterval("bangDrums()", 2000);
};

// If it's been more than 2s since the last click/keydown add directions, play voice, clear & reset interval;
var bangDrums = function bangDrums() {
  if (Date.now() - lastClick > 1999) {
    if (directions.innerHTML === "") {
      directions.innerHTML = "bang them drums";
      bangDrumsVoice.play();
      numberOfClicks = 0;
      window.clearInterval(intervalID);
    }
  }
};

// keycodes of letters that represent colors of drums
var isYellow = function isYellow(code) {
  if (code == 89 || code == 79 || code == 72) {
    return true;
  }
};

var isPurple = function isPurple(code) {
  if (code == 77 || code == 78) {
    return true;
  }
};

var isGreen = function isGreen(code) {
  if (code == 85 || code == 73 || code == 74 || code == 75) {
    return true;
  }
};
// ----------------

var addDrumName = function addDrumName() {
  return drumName.classList.add("drumType");
};

var addClasses = function addClasses(code, el) {
  if (isPurple(code)) {
    purpLine.classList.add("line-transition");
  } else if (isGreen(code)) {
    greenLine.classList.add("line-transition");
  } else if (isYellow(code)) {
    yellowLine.classList.add("line-transition");
    el.classList.add("cymb-animation");
    el.classList.add("play");
  }
};

window.addEventListener('keydown', function (event) {
  numberOfClicks += 1;
  lastClick = Date.now();
  checkToStartInterval();

  var target = document.querySelector('div[data-key="' + event.keyCode + '"]');

  var audio = document.querySelector('audio[data-key="' + event.keyCode + '"]');

  if (!audio) return;
  audio.currentTime = 0;
  audio.play();

  directions.innerHTML = '';

  keyCodes.map(function (el) {
    var kc = event.keyCode;
    if (kc == el.keycode) {
      drumName.innerHTML = el.drumType.toUpperCase();
    }

    addClasses(kc, target);
    target.classList.add("play");
  });

  addDrumName();
});

drums.addEventListener('click', function (event) {
  numberOfClicks += 1;
  lastClick = Date.now();
  checkToStartInterval();

  var audio = document.querySelector('audio[data-key="' + event.target.getAttribute('data-key') + '"]');

  if (!audio) return;
  audio.currentTime = 0;
  audio.play();

  directions.innerHTML = '';

  keyCodes.map(function (el) {
    if (event.target.getAttribute('data-key') == el.keycode) {
      drumName.innerHTML = el.drumType.toUpperCase();
    }
  });

  var dk = event.target.getAttribute('data-key');

  addClasses(dk, event.target);
  event.target.classList.add("play");
  addDrumName();
});

var removeTransition = function removeTransition(event) {
  for (var x = 0; x < lines.length; x++) {
    lines[x].classList.remove('line-transition');
  }
  event.target.classList.remove('cymb-animation');
  event.target.classList.remove('play');
  drumName.classList.remove('drumType');
  drumName.innerHTML = '';
};

var endTransition = function endTransition(element) {
  element.addEventListener('transitionend', removeTransition);
};

allDrums.forEach(function (drum) {
  endTransition(drum);
});

endTransition(drumName);
//# sourceMappingURL=app-es5.js.map
