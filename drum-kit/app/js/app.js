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

const drums = document.getElementById("drums-container")
const footer = document.querySelector('footer')

window.addEventListener('keydown', (event) => {
  let target = document.querySelector(`div[data-key="${event.keyCode}"]`)
  console.log(target)
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);

  if (!audio) return;
  audio.play()

  keyCodes.map((el) => {
    if (event.keyCode == el.keycode) {
      footer.innerHTML = el.drumType.toUpperCase();
    }
  })
    target.classList.add("play");
});


drums.addEventListener('click', (event) => {
  console.log(event.target)
  const audio = document.querySelector(`audio[data-key="${event.target.getAttribute('data-key')}"]`);

  if (!audio) return;
  audio.play();

  keyCodes.map((el) => {
    if (event.target.getAttribute('data-key') == el.keycode) {
      footer.innerHTML = el.drumType.toUpperCase();
    }
  });

  event.target.classList.add("play");
})

const removeTransition = function(event) {
  event.target.classList.remove('play')
}

const eachDrum = document.querySelectorAll('.drum');

eachDrum.forEach((drum) => {
  drum.addEventListener('transitionend', removeTransition)
})
