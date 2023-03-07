// STYLESHEET
import '/scss/styles.scss';

// GAME SCRIPTS
const scorePoints = document.querySelector('#score-points');

const board = document.querySelector('#board');
const allChips = board.querySelectorAll('button[chip-value]');

const chosenChips = document.querySelector('#chosen-chips');
const userChip = chosenChips.querySelector('#user-chip');
const houseChip = chosenChips.querySelector('#house-chip');

const results = chosenChips.querySelector('#results');
const resultsTitle = results.querySelector('#results-title');
const replayBtn = results.querySelector('#btn-replay');

const rulesBtn = document.querySelector('#btn-rules');

let userChoice = null;
let houseChoice = null;

// add event listener to all btns
board.addEventListener('click', (event) => {
  const target = event.target;

  if (target.hasAttribute('chip-value')) {
    // get user choice and house choice
    userChoice = target.getAttribute('chip-value');
    generateHouseChoice();
    addStyles();
    getWinner();
  }
});

// replay button click event
replayBtn.addEventListener('click', removeStyles);

function addStyles() {
  board.classList.add('animate-closing');
  userChip.classList.add(`chip--${userChoice}`);
  houseChip.classList.add(`chip--${houseChoice}`);
  // hide board and show results on animation end
  board.addEventListener('animationend',
    () => {
      // hide board
      board.classList.add('hidden');
      // show results
      chosenChips.classList.remove('hidden');
    });
};

function removeStyles() {
  // remove previous game styles
  board.classList.remove('animate-closing',
    'hidden');
  userChip.classList.remove(`chip--${userChoice}`);
  houseChip.classList.remove(`chip--${houseChoice}`);
  chosenChips.classList.add('hidden');
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

// get winner
function getWinner() {
  let winner = null;
  let score = 0;
  if (!userChoice) {
    winner = 'Error: Try again';
  } else if (userChoice === houseChoice) {
    winner = 'It\'s a Draw';
  } else if (
    (userChoice === 'rock' && houseChoice === 'scissors') ||
    (userChoice === 'paper' && houseChoice === 'rock') ||
    (userChoice === 'scissors' && houseChoice === 'paper')
  ) {
    winner = 'You Win';
    score++;
  } else {
    winner = 'You Lose';
    // decrement only when score is more than zero
    if (!score) score--;
  }
  resultsTitle.textContent = winner;
  //update score
  scorePoints.textContent = `${JSON.parse(scorePoints.textContent) + score}`;
};