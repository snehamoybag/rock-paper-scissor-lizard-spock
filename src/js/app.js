// stylesheet
import '/scss/styles.scss';

/* // GAME SCRIPTS // */
const defaultChipsEl = document.querySelector('#default-chips');
const allChipBtnEls = defaultChipsEl.querySelectorAll('.chip');
const chosenChipsEl = document.querySelector('#chosen-chips');

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

// hide default chips and then show chosen chips
const displayChosenChips = (userChoice, houseChoice) => {
  const userChipEl = chosenChipsEl.querySelector('#user-chip');
  const houseChipEl = chosenChipsEl.querySelector('#house-chip');
  // update chosen chips styles
  userChipEl.dataset.chipValue = userChoice;
  houseChipEl.dataset.chipValue = houseChoice;
  // hide default chips
  defaultChipsEl.classList.remove('animate-opening');
  defaultChipsEl.classList.add('no-btn-effs', 'animate-closing');
  chosenChipsEl.classList.remove('animate-closing');
  // show chosen chips on animation end
  defaultChipsEl.addEventListener('animationend', () => {
    defaultChipsEl.classList.add('hidden');
    chosenChipsEl.classList.remove('hidden');
    chosenChipsEl.classList.add('animate-opening');
  });
};

// hide chosen chips and show default chips
const displayDefualtChips = () => {
  chosenChipsEl.classList.remove('animate-opening');
  chosenChipsEl.classList.add('animate-closing');
  defaultChipsEl.classList.remove('animate-closing', 'no-btn-effs');
  // show default chips on animation end
  chosenChipsEl.addEventListener('animationend', () => {
    chosenChipsEl.classList.add('hidden');
    defaultChipsEl.classList.remove('hidden');
    defaultChipsEl.classList.add('animate-opening');
  });
};

// display results
const displayResults = (userChoice, houseChoice) => {
  const resultsEl = document.querySelector('#results');
  const resultsTitleEl = resultsEl.querySelector('.results__title');
  const btnReplay = resultsEl.querySelector('#btn-replay');
  const resultsObj = getResults(userChoice, houseChoice);
  resultsTitleEl.textContent = resultsObj.resultString;
  updateScore(resultsObj.resultPoint);
  btnReplay.addEventListener('click', displayDefualtChips);
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