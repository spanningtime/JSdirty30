
const keyCodes = [
  { keycode: 89, drumType: 'open high hat' },
  { keycode: 85, drumType: 'tom' },
  { keycode: 73, drumType: 'tom' },
  { keycode: 79, drumType: 'ride' },
  { keycode: 72, drumType: 'hi hat' },
  { keycode: 74, drumType: 'floor tom' },
  { keycode: 75, drumType: 'floor tom' },
  { keycode: 78, drumType: 'snare' },
  { keycode: 77, drumType: 'kick'}
];

const purpLine = document.getElementById('purp');
const greenLine = document.getElementById('green');
const yellowLine = document.getElementById('yellow');
const lines = document.getElementsByClassName('line');
const drums = document.getElementById('drums-container');
const allDrums = document.querySelectorAll('.drum');
const drumName = document.getElementById('drum-name');
const directions = document.getElementById('directions');
const bangDrumsVoice = document.getElementById('bangDrumsVoice');
let numberOfClicks = 0;
let lastClick;
let intervalID;

window.onresize = () => directions.innerHTML = "bang them drums";

window.onload = bangDrumsVoice.play();

//To avoid having multiple intervals started this only starts an interval after the first click or keydown.
const checkToStartInterval = function() {
  numberOfClicks < 2 ? startInterval() : null;
}


const startInterval = function() {
    intervalID = window.setInterval("bangDrums()", 2000);
};

// If it's been more than 2s since the last click/keydown add directions, play voice, clear & reset interval;
const bangDrums = function() {
  if (Date.now() - lastClick > 1999) {
    if (directions.innerHTML === "") {
      directions.innerHTML = "bang them drums";
      bangDrumsVoice.play();
      numberOfClicks = 0;
      window.clearInterval(intervalID)
    }
  }
};

// keycodes of letters that represent colors of drums
const isYellow = function(code) {
  if (code == 89 || code == 79 || code == 72) {
    return true;
  }
};

const isPurple = function(code) {
  if (code == 77 || code == 78) {
    return true;
  }
};

const isGreen = function(code) {
  if (code == 85 || code == 73 || code == 74 || code == 75) {
    return true;
  }
};

const addDrumName = () => drumName.classList.add("drumType");

const addClasses = (code, el) => {
  if (isPurple(code)) {
    purpLine.classList.add("line-transition");
  }
  else if (isGreen(code)) {
    greenLine.classList.add("line-transition");
  }
  else if (isYellow(code)) {
    yellowLine.classList.add("line-transition");
    el.classList.add("cymb-animation");
    el.classList.add("play");
  }
};

window.addEventListener('keydown', (event) => {
  numberOfClicks += 1;
  lastClick = Date.now();
  checkToStartInterval();

  let target = document.querySelector(`div[data-key="${event.keyCode}"]`);

  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);

  if (!audio) return;
  audio.currentTime = 0;
  audio.play()

  directions.innerHTML = '';

  keyCodes.map((el) => {
    let kc = event.keyCode;
    if (kc == el.keycode) {
      drumName.innerHTML = el.drumType.toUpperCase();
    }

    addClasses(kc, target);
    target.classList.add("play");
  });

    addDrumName();
});

drums.addEventListener('click', (event) => {
  numberOfClicks += 1;
  lastClick = Date.now();
  checkToStartInterval();
  const audio = document.querySelector(`audio[data-key="${event.target.getAttribute('data-key')}"]`);

  if (!audio) return;
  audio.currentTime = 0;
  audio.play();

  directions.innerHTML = '';

  keyCodes.map((el) => {
    if (event.target.getAttribute('data-key') == el.keycode) {
      drumName.innerHTML = el.drumType.toUpperCase();
    }
  });

  let dk = event.target.getAttribute('data-key');

  addClasses(dk, event.target)
  event.target.classList.add("play");
  addDrumName();
});

const removeTransition = function(event) {
  for (let x = 0; x < lines.length; x++) {
    lines[x].classList.remove('line-transition');
  }
  event.target.classList.remove('cymb-animation')
  event.target.classList.remove('play');
  drumName.classList.remove('drumType');
  drumName.innerHTML = '';
}

const endTransition = function(element) {
  element.addEventListener('transitionend', removeTransition);
}

allDrums.forEach((drum) => {
  endTransition(drum)
});

endTransition(drumName);
