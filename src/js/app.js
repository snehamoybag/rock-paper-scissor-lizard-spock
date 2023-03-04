// STYLESHEET
import '/scss/styles.scss';

// GAME SCRIPTS
const board = document.querySelector('#board');
const allChips = board.querySelectorAll('button[chip-value]');
const rulesBtn = document.querySelector('#rules');

let userChoice = null;
let userChip = null;
let houseChoice = null;
let houseChip = null;

// add click event to all chips
board.addEventListener(
  'click',
  // callback function
  startGame,
  {
    // adds event only for once
    once: true,
  }
);

// start game function
function startGame(event) {
  const target = event.target;

  if (target.hasAttribute('chip-value')) {
    userChoice = target.getAttribute('chip-value');
    userChip = target;
    // house/cpu choice
    generateHouseChoice();
    houseChip = board.querySelector(`[chip-value=${houseChoice}]`);
    // add remeove animation and grid classes
    board.classList.add('no-shape', 'grid', 'grid--double-columns', 'grid--align-start');
    // renders chosen chips after animation
    renderOnAnimationEnd();
  }
};

// generate house/cpu choice
function generateHouseChoice () {
  const allChipsValues = [];
  let chipValue = null;
  // get all the chip values dynamically
  for (let i = 0; i < allChips.length; i++) {
    chipValue = allChips[i].getAttribute('chip-value');
    allChipsValues.push(chipValue);
  }
  // randomly define house choice
  houseChoice = allChipsValues[Math.floor(Math.random() * allChipsValues.length)];
};

// render new chips on animation end
function renderOnAnimationEnd() {
  board.addEventListener('animationend', () => {
    removeChips();
    // user chosen chip
    createChipElm(userChoice, 'You');
    // house chosen chip
    createChipElm(houseChoice, 'The House');
  }, {
    once: true
  });
};

// remove chips from DOM
function removeChips() {
  allChips.forEach(chip => {
    chip.parentElement.classList.add('remove');
  });
}

// create chip DOM element
function createChipElm(choice, playerName) {
  const chipContainer = document.createElement('div');
  const paragraph = document.createElement('p');
  const chip = document.createElement('div');
  const span = document.createElement('span');

  chip.classList.add('chip', `chip--${choice}`);
  span.classList.add('sr-only');
  span.textContent = `${choice}`;
  paragraph.classList.add('chip__paragraph');
  paragraph.textContent = `${playerName} Picked`;

  if (choice === userChoice) {
    chipContainer.classList.add('board__chip-choice-wrapper', 'align-start');
  } else {
    chipContainer.classList.add('board__chip-choice-wrapper', 'align-end');
  }

  chip.append(span, paragraph);
  chipContainer.append(chip);
  // renders to DOM
  board.appendChild(chipContainer);
}