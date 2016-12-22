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
console.log(lines);

const drums = document.getElementById('drums-container')
const drumName = document.querySelector('p')

window.onresize = function() {
  drumName.innerHTML = "bang on them drums"
}

const addDrumName = function() {
  drumName.classList.add("drumType")
};

window.addEventListener('keydown', (event) => {
  let target = document.querySelector(`div[data-key="${event.keyCode}"]`)
  console.log(target)
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);

  if (!audio) return;
  audio.play()

  keyCodes.map((el) => {
    let kc = event.keyCode;
    if (kc == el.keycode) {
      drumName.innerHTML = el.drumType.toUpperCase();
    }
    if (kc == 89 || kc == 79 || kc == 72) {
      target.classList.add('cymb-animation');
      target.classList.add("play");
      yellowLine.classList.add("line-transition");
    }

    if (kc == 77 || kc == 78) {
      purpLine.classList.add("line-transition");
    }

    if (kc == 85 || kc == 73 || kc == 74 || kc == 75) {
      greenLine.classList.add("line-transition");
    }
    target.classList.add("play");
  })
    addDrumName();
});

drums.addEventListener('click', (event) => {
  console.log(event.target)
  const audio = document.querySelector(`audio[data-key="${event.target.getAttribute('data-key')}"]`);



  if (!audio) return;
  audio.play();

  keyCodes.map((el) => {
    if (event.target.getAttribute('data-key') == el.keycode) {
      drumName.innerHTML = el.drumType.toUpperCase();
    }
  });

  let dk = event.target.getAttribute('data-key');

  if (dk == 89 || dk == 79 || dk == 72) {
    event.target.classList.add("cymb-animation");
    yellowLine.classList.add("line-transition");
  }

  if (dk == 77 || dk == 78) {
    purpLine.classList.add("line-transition");
  }

  if (dk == 85 || dk == 73 || dk == 74 || dk == 75) {
    greenLine.classList.add("line-transition")
  };

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

eachDrum.forEach((drum) => {
  drum.addEventListener('transitionend', removeTransition)
});

drumName.addEventListener('transitionend', removeTransition);
