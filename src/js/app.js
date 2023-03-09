// STYLESHEET
import '/scss/styles.scss';

// GAME SCRIPTS
const scorePoints = document.querySelector('#score-points');

const board = document.querySelector('#board');
const allChips = board.querySelectorAll('button[chip-value]');

const chosenChips = document.querySelector('#chosen-chips');
const userChip = chosenChips.querySelector('#user-chip');
const userChipSrOnly = userChip.querySelector('.sr-only');
const houseChip = chosenChips.querySelector('#house-chip');
const houseChipSrOnly = houseChip.querySelector('.sr-only');

const results = chosenChips.querySelector('#results');
const resultsTitle = results.querySelector('#results-title');
const replayBtn = results.querySelector('#btn-replay');

const rulesImg = document.querySelector('#rules-img');
const rulesOpenBtn = document.querySelector('#btn-rules-open');
const rulesCloseBtn = document.querySelector('#btn-rules-close');

let userChoice = null;
let houseChoice = null;

// add event listener to all btns
board.addEventListener('click', (event) => {
  const target = event.target;

  if (target.hasAttribute('chip-value')) {
    // get user choice and house choice
    userChoice = target.getAttribute('chip-value');
    generateHouseChoice();
    gameOnStyles();
  }
});

// replay button click event
replayBtn.addEventListener('click', defaultStyles);

// show rules
rulesOpenBtn.addEventListener('click', showRules);
// close rules
rulesCloseBtn.addEventListener('click', closeRules);

// styles to apply when game has started
function gameOnStyles() {
  board.classList.remove('animate-opening');
  board.classList.add('animate-closing');
  userChip.classList.add(`chip--${userChoice}`);
  houseChip.classList.add(`chip--${houseChoice}`);
  // screen reader only texts
  userChipSrOnly.textContent = `${userChoice}`;
  houseChipSrOnly.textContent = `${houseChoice}`;
  // hide board and show results on animation end
  board.addEventListener('animationend',
    () => {
      board.classList.add('hidden');
      chosenChips.classList.remove('hidden', 'animate-closing');
      setTimeout(() => {
        // show results
        generateResults();
        results.classList.remove('hidden');
      }, 600);
    },
    {
      once: true,
    });
};

// revert back to default game satates
function defaultStyles() {
  board.classList.add('animate-opening');
  chosenChips.classList.add('animate-closing');
  // hide chosen chips and show board on animation end
  chosenChips.addEventListener('animationend',
    () => {
      chosenChips.classList.add('hidden');
      userChip.classList.remove(`chip--${userChoice}`);
      houseChip.classList.remove(`chip--${houseChoice}`);
      results.classList.add('hidden')
      board.classList.remove('animate-closing', 'hidden');
    },
    {
      once: true,
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

// get winner
function generateResults() {
  let winner = null;
  let score = 0;
  if (!userChoice) {
    winner = 'Error!';
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
    // score--;
  }
  resultsTitle.textContent = winner;
  //update score
  scorePoints.textContent = `${JSON.parse(scorePoints.textContent) + score}`;
};

function showRules() {
  rulesImg.classList.remove('hidden', 'animate-closing');
  rulesImg.classList.add('animate-opening');
  rulesOpenBtn.setAttribute('aria-expanded', 'true');
}

function closeRules() {
  rulesImg.classList.remove('animate-opening');
  rulesImg.classList.add('animate-closing');

  rulesImg.addEventListener('animationend', () => {
    rulesImg.classList.add('hidden');
    rulesOpenBtn.setAttribute('aria-expanded', 'false');
  }, {
    once: true,
  });
}