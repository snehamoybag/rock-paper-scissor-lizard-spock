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

let winnerTxt = null;

// start game, default behaviour
startGame();
// replay click event
replayBtn.addEventListener('click', () => {
  
});

// start Game function
function startGame() {
  // add click event to all chips
  board.addEventListener('click', e => {
    const target = e.target;

    if (target.hasAttribute('chip-value')) {
      // remove pattern animation
      board.classList.add('animate-pattern-close');
      allChips.forEach(chip => {
        // remove chips hover and click effects
        chip.classList.add('no-btn-effs');
        chip.parentElement.classList.add('animate-closing');
      });
      // get user choice and house choice
      userChoice = target.getAttribute('chip-value');
      generateHouseChoice();
      console.log(userChoice, houseChoice);
      // add classes to chosen chips depending on user and house choice
      userChip.classList.add(`chip--${userChoice}`);
      houseChip.classList.add(`chip--${houseChoice}`);
      // hide board and show results
      showResults();
    }
  },
    // add addEventListener only for once
    {
      once: true
    });
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

// show results on animation end
function showResults() {
  board.addEventListener('animationend', () => {
    // hide board
    board.classList.add('hidden');
    // show results
    chosenChips.classList.remove('hidden');
  }, {
    once: true
  });
};

// hide results and show default chips
function hideResults() {
  // hide results
  chosenChips.classList.add('hidden');
  // show board
  board.classList.remove('hidden');
}

function showDefaultChips() {
  board.classList.remove('animate-pattern-close');
  allChips.forEach(chip => {
    // remove chips hover and click effects
    chip.classList.remove('no-btn-effs');
    chip.parentElement.classList.remove('animate-closing');
  });
}
// get winner
function getWinner() {
  let score = 0;

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
    score++;
  } else {
    winnerTxt = 'You Lose';
    if (!score < 0) score--;
  }
  return score;
}