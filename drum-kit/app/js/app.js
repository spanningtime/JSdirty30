'use strict'

const keyCodes = [
  { keycode: 89, drumType: 'open high hat' },
  { keycode: 85, drumType: 'boom' },
  { keycode: 73, drumType: 'boom' },
  { keycode: 79, drumType: 'ride' },
  { keycode: 72, drumType: 'hi hat' },
  { keycode: 74, drumType: 'tom' },
  { keycode: 75, drumType: 'tom' },
  { keycode: 78, drumType: 'snare' },
  { keycode: 77, drumType: 'kick'}
];

const purpLine = document.getElementById('purp');
const greenLine = document.getElementById('green');
const yellowLine = document.getElementById('yellow');
const lines = document.getElementsByClassName('line');
const drums = document.getElementById('drums-container');
const drumName = document.querySelector('p');

const addDrumName = function() {
  drumName.classList.add("drumType")
};

window.onresize = function() {
  drumName.innerHTML = "bang on them drums"
}

const isYellow = function(code) {
  console.log(code)
  if (code == 89 || code == 79 || code == 72) {
    return true;
  };
}

const isPurple = function(code) {
  console.log(code)
  if (code == 77 || code == 78) {
    return true;
  }
}

const isGreen = function(code) {
  console.log(code);
  if (code == 85 || code == 73 || code == 74 || code == 75) {
    return true;
  }
}

const addClasses = function(code, el) {
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
}

window.addEventListener('keydown', (event) => {
  let target = document.querySelector(`div[data-key="${event.keyCode}"]`)

  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);

  if (!audio) return;
  audio.play()

  keyCodes.map((el) => {
    console.log(target);
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
  const audio = document.querySelector(`audio[data-key="${event.target.getAttribute('data-key')}"]`);

  if (!audio) return;
  audio.play();

  keyCodes.map((el) => {
    if (event.target.getAttribute('data-key') == el.keycode) {
      drumName.innerHTML = el.drumType.toUpperCase();
    }
  });

  let dk = event.target.getAttribute('data-key');

  addClasses(dk, event.target)
  event.target.classList.add("play");
  addDrumName();
})

const removeTransition = function(event) {
  for (let el of lines) {
    el.classList.remove('line-transition')
  }
  event.target.classList.remove('cymb-animation')
  event.target.classList.remove('play');
  drumName.classList.remove('drumType');
  drumName.innerHTML = '';
}

const eachDrum = document.querySelectorAll('.drum');

const endTransition = function(element) {
  element.addEventListener('transitionend', removeTransition);
}

eachDrum.forEach((drum) => {
  endTransition(drum)
});

endTransition(drumName);
