// STYLESHEET
import '/scss/styles.scss';

// GAME SCRIPTS
const scorePoints = document.querySelector('#score-points');
const board = document.querySelector('#board');
const allChips = board.querySelectorAll('button[chip-value]');
const rulesBtn = document.querySelector('#rules');

let score = 0;
// set score
scorePoints.textContent = score;
let userChoice = null;
let userChip = null;
let houseChoice = null;
let houseChip = null;
let winnerTxt = null;


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
    // add chip remove animation and grid classes
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
    // renders user chosen chip
    createRenderChipElm(userChoice, 'You');
    // render house chosen chip
    createRenderChipElm(houseChoice, 'The House');
    // renders results after some time has passed
    setTimeout(createRenderResultsElm, 1000);
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
function createRenderChipElm(choice, playerName) {
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

// create and render render results on DOM
function createRenderResultsElm() {
  getWinner();
  const container = document.createElement('div');
  const h2 = document.createElement('h2');
  const button = document.createElement('button');

  h2.textContent = winnerTxt;
  button.textContent = 'Play Again';

  button.addEventListener('click', () => {
    console.log('hello world');
  });
  container.append(h2, button);

  board.appendChild(container);
}

// get winner
function getWinner() {
  if (!userChoice) {
    winnerTxt = 'Error: Try again';
  } else if (userChoice === houseChoice) {
    winnerTxt = 'It\'s a Draw';
  } else if (
    (userChoice === 'rock' && houseChoice === 'scissors') ||
    (userChoice === 'paper' && houseChoice === 'rock') ||
    (userChoice === 'scissors' && houseChoice === 'paper')
  ) {
    winnerTxt = 'You Win';
  } else {
    winnerTxt = 'You Lose'
  }
}

console.log(score);