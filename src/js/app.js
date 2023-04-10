// stylesheet
import '/scss/styles.scss';

/* // GAME SCRIPTS // */
const defaultChipsEl = document.querySelector('#default-chips');
const allChipBtnEls = defaultChipsEl.querySelectorAll('.chip');

// game logic
const getResults = (userChoice, houseChoice) => {
  let resultPoint = 0;
  let resultString = '';

  if (userChoice === houseChoice) {
    resultPoint = 0;
    resultString = 'It\'s a Draw';
  } else if (
    (userChoice === 'rock' && houseChoice === 'scissors') ||
    (userChoice === 'paper' && houseChoice === 'rock') ||
    (userChoice === 'scissors' && houseChoice === 'paper')
  ) {
    resultPoint = 1;
    resultString = 'You Win';
  } else {
    resultPoint = -1;
    resultString = 'You Lose';
  }
  // return an object
  return {
    resultPoint,
    resultString
  };
};

//update score on DOM
const updateScore = (result) => {
  const scoreEl = document.querySelector('#score-points');
  scoreEl.textContent = Number(scoreEl.textContent) + result;
};

// hide chips function
const hideChipsEl = (el) => {
  el.classList.remove('animate-opening');
  el.classList.add('animate-closing', 'no-btn-effs');
  // display: none element on animation end
  el.addEventListener('animationend', () => el.classList.add('hidden'));
};

// show chips function
const showChipsEl = (closingEl, showEl) => {
  // wait for a closing element to finish animation (closingEl),
  // then show the elment (showEl)
  closingEl.addEventListener('animationend', () => {
    showEl.classList.remove('hidden', 'no-btn-effs');
    showEl.classList.add('animate-opening');
  });
};

// display choices on DOM
const displayChosenChips = (userChoice, houseChoice) => {
  const chosenChipsEl = document.querySelector('#chosen-chips');
  const userChipEl = chosenChipsEl.querySelector('#user-chip');
  const houseChipEl = chosenChipsEl.querySelector('#house-chip');

  // apply chosen chips styles
  userChipEl.dataset.chipValue = userChoice;
  houseChipEl.dataset.chipValue = houseChoice;

  hideChipsEl(defaultChipsEl);
  showChipsEl(defaultChipsEl, chosenChipsEl);
};

// display results
const displayResults = (userChoice, houseChoice) => {
  const resultsEl = document.querySelector('#results');
  const resultsTitleEl = resultsEl.querySelector('.results__title');
  const resultsObj = getResults(userChoice, houseChoice);
  resultsTitleEl.textContent = resultsObj.resultString;
  updateScore(resultsObj.resultPoint);
};

// generate random CPU choice
const getHouseChoice = () => {
  const numberOfChoices = allChipBtnEls.length;
  const randomNumber = Math.floor(Math.random() * numberOfChoices);
  const houseChoice = allChipBtnEls[randomNumber].dataset.chipValue;
  return houseChoice;
};

// run game
const runGame = (e) => {
  const userChoice = e.target.dataset.chipValue;
  const houseChoice = getHouseChoice();
  displayChosenChips(userChoice, houseChoice);
  displayResults(userChoice, houseChoice);
};

// add click event to all chip buttons
allChipBtnEls.forEach(chipBtn => chipBtn.addEventListener('click', runGame));