// STYLESHEET
import '/scss/styles.scss';

// GAME SCRIPTS
const scorePoints = document.querySelector('#score-points');

const defaultChips = document.querySelector('#default-chips');
const allChips = defaultChips.querySelectorAll('button[data-chip-value]');

const chosenChips = document.querySelector('#chosen-chips');
const userChip = chosenChips.querySelector('#user-chip');
const userChipSrOnly = userChip.querySelector('.sr-only');
const houseChip = chosenChips.querySelector('#house-chip');
const houseChipSrOnly = houseChip.querySelector('.sr-only');

const results = chosenChips.querySelector('#results');
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
  userChoice = this.getAttribute('chip-value');
  generateHouseChoice();
  // screen reader only texts
  userChipSrOnly.textContent = `${userChoice}`;
  houseChipSrOnly.textContent = `${houseChoice}`;
  userChip.classList.add(`chip--${userChoice}`);
  houseChip.classList.add(`chip--${houseChoice}`);
  defaultChips.classList.remove('animate-opening');
  defaultChips.classList.add('animate-closing', 'no-btn-effs');
  // hide defaultChips and show results on animation end
  defaultChips.addEventListener('animationend', () => {
    defaultChips.classList.add('hidden');
    chosenChips.classList.remove('hidden', 'animate-closing');
    chosenChips.classList.add('animate-opening');
    // show results after some time
    setTimeout(generateResults, 1000);
  }, {
    once: true,
  });
};

// revert back to default game satates
function replayGame() {
  chosenChips.classList.add('animate-closing');
  // hide chosen chips and show defaultChips on animation end
  chosenChips.addEventListener('animationend', () => {
    chosenChips.classList.remove('animate-opening');
    chosenChips.classList.add('hidden');
    userChip.classList.remove(`chip--${userChoice}`);
    houseChip.classList.remove(`chip--${houseChoice}`);
    defaultChips.classList.remove('animate-closing', 'no-btn-effs', 'hidden');
    defaultChips.classList.add('animate-opening');
  }, {
    once: true,
  });
};

// generate house/cpu choice
function generateHouseChoice () {
  const allChipsValues = [];
  let chipValue = null;
  // get all the chip values dynamically
  for (let i = 0; i < allChips.length; i++) {
    //chipValue = allChips[i].getAttribute('data-chip-value');
    chipValue = allChips[i].dataset.chipValue; // same as above
    allChipsValues.push(chipValue);
  }
  // randomly define house choice
  houseChoice = allChipsValues[Math.floor(Math.random() * allChipsValues.length)];
  console.log(allChipsValues);
};

// get winner
function generateResults() {
  let winner = null;
  let score = 0;
  if (!userChoice) {
    winner = 'Error!';
  } else if (userChoice === houseChoice) {
    winner = 'Draw';
  } else if (
    (userChoice === 'rock' && houseChoice === 'scissors') ||
    (userChoice === 'paper' && houseChoice === 'rock') ||
    (userChoice === 'scissors' && houseChoice === 'paper')
  ) {
    winner = 'You Win';
    score++;
  } else {
    winner = 'You Lose';
    //score--; // should I decrease the score?
  }
  resultsTitle.textContent = winner;
  //update score
  scorePoints.textContent = `${JSON.parse(scorePoints.textContent) + score}`;
};

function showRules() {
  rulesModal.classList.remove('hidden', 'animate-closing');
  rulesModal.classList.add('animate-opening');
  rulesOpenBtn.setAttribute('aria-expanded', 'true');
};

function closeRules() {
  rulesModal.classList.remove('animate-opening');
  rulesModal.classList.add('animate-closing');

  rulesModal.addEventListener('animationend', () => {
    rulesModal.classList.add('hidden');
    rulesOpenBtn.setAttribute('aria-expanded', 'false');
  }, {
    once: true,
  });
};