// STYLESHEET
import '/scss/styles.scss';

// GAME SCRIPTS
const defaultChips = document.querySelector('#default-chips');
const allChips = defaultChips.querySelectorAll('[data-chip-value]');

const chosenChips = document.querySelector('#chosen-chips');
const userChip = chosenChips.querySelector('#user-chip');
const userChipSrOnly = userChip.querySelector('.sr-only');
const houseChip = chosenChips.querySelector('#house-chip');
const houseChipSrOnly = houseChip.querySelector('.sr-only');

const results = document.querySelector('#results');
const resultsTitle = results.querySelector('#results-title');
const replayBtn = results.querySelector('#btn-replay');

const rulesModal = document.querySelector('#rules-modal');
const rulesOpenBtn = document.querySelector('#btn-rules-open');
const rulesCloseBtn = document.querySelector('#btn-rules-close');

let userChoice = null;
let houseChoice = null;

// add event listener to all btns
allChips.forEach(chip => chip.addEventListener('click', startGame));
// replay button click event
replayBtn.addEventListener('click', replayGame);
// show rules
rulesOpenBtn.addEventListener('click', showRules);
// close rules
rulesCloseBtn.addEventListener('click', closeRules);

// start game function
function startGame() {
  // get user and house choice
  const selectedChip = this;
  userChoice = selectedChip.dataset.chipValue;
  generateHouseChoice();

  selectedChip.parentElement.classList.add('selected');
  userChip.classList.add(`chip--${userChoice}`);
  houseChip.classList.add(`chip--${houseChoice}`);
  defaultChips.classList.add('animate-closing', 'no-btn-effs');

  // screen reader only texts
  userChipSrOnly.textContent = `${userChoice}`;
  houseChipSrOnly.textContent = `${houseChoice}`;

  //hide defaultChips and show results on animation end
  defaultChips.addEventListener('animationend', () => {
    selectedChip.parentElement.classList.remove('selected');
    defaultChips.classList.add('hidden');
    defaultChips.classList.remove('animate-closing', 'no-btn-effs');
    chosenChips.classList.remove('hidden');
  }, {
    once: true, // runs event only once
  });

  chosenChips.addEventListener('animationend', () => {
    // show results after some time
    setTimeout(() => {
      generateResults();
      results.classList.remove('hidden');
    }, 500);
  }, {
    once: true, // runs event only once
  });
};

// revert back to default game states
function replayGame() {
  chosenChips.classList.add('animate-closing');
  results.classList.add('animate-closing');

  // hide chosen chips and show defaultChips on animation end
  chosenChips.addEventListener('animationend', () => {
    chosenChips.classList.add('hidden');
    chosenChips.classList.remove('animate-closing');
    userChip.classList.remove(`chip--${userChoice}`);
    houseChip.classList.remove(`chip--${houseChoice}`);
    defaultChips.classList.remove('hidden');
  }, {
    once: true, // runs event only once
  });

  // hide results on animation end
  results.addEventListener('animationend', () => {
    results.classList.add('hidden');
    results.classList.remove('animate-closing');
  }, {
    once: true, // runs event only once
  });
};

// generate house/cpu choice
function generateHouseChoice () {
  const allChipsValues = [];
  let chipValue = null;

  // get all the chip values dynamically
  for (let i = 0; i < allChips.length; i++) {
    chipValue = allChips[i].dataset.chipValue;
    allChipsValues.push(chipValue);
  }
  // randomly define house choice
  houseChoice = allChipsValues[Math.floor(Math.random() * allChipsValues.length)];
};

// get winner
function generateResults() {
  const scorePoints = document.querySelector('#score-points');
  let winnerTxt = '';
  let score = Number(scorePoints.textContent);

  if (!userChoice) {
    winnerTxt = 'Error!';
  } else if (userChoice === houseChoice) {
    winnerTxt = 'Draw';
  } else if (
    (userChoice === 'rock' && houseChoice === 'scissors') ||
    (userChoice === 'paper' && houseChoice === 'rock') ||
    (userChoice === 'scissors' && houseChoice === 'paper')
  ) {
    winnerTxt = 'You Win';
    score++;
  } else {
    winnerTxt = 'You Lose';
    // decerement score only if its more than 0
    (score > 0) ? score--: score;
  }
  // show win or lose texts
  resultsTitle.textContent = winnerTxt;
  //update score
  scorePoints.textContent = score;
};

function showRules() {
  rulesModal.classList.remove('hidden');
  rulesOpenBtn.setAttribute('aria-expanded', 'true');
};

function closeRules() {
  rulesModal.classList.add('animate-closing');

  rulesModal.addEventListener('animationend', () => {
    rulesModal.classList.add('hidden');
    rulesModal.classList.remove('animate-closing');
    rulesOpenBtn.setAttribute('aria-expanded', 'false');
  }, {
    once: true, // runs event only once
  });
};