// stylesheet
import '/scss/styles.scss';

/* // GAME SCRIPTS // */
const defaultChipsEl = document.querySelector('#default-chips');
const allChipBtnEls = defaultChipsEl.querySelectorAll('.chip');
const chosenChipsEl = document.querySelector('#chosen-chips');
const userChipEl = chosenChipsEl.querySelector('#user-chip');
const houseChipEl = chosenChipsEl.querySelector('#house-chip');
const resultsEl = document.querySelector('#results');

let userChoice = '';
let houseChoice = '';

// game logic
const getResults = () => {
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

// add winning effects to the winner
const displayWinner = (result) => {
  if (result === 1) {
    houseChipEl.parentNode.classList.remove('winner');
    userChipEl.parentNode.classList.add('winner');
  } else if (result === - 1) {
    userChipEl.parentNode.classList.remove('winner');
    houseChipEl.parentNode.classList.add('winner');
  };
};

// remove winner effects
const removeWinnerEffs = () => {
  userChipEl.parentNode.classList.remove('winner');
  houseChipEl.parentNode.classList.remove('winner');
};

// remove selected class from chip
const removeSelectedClass = () => {
  const selectedEl = defaultChipsEl.querySelector('.selected');
  selectedEl.classList.remove('selected');
};

// hide chosen chips and results then show default chips
const displayDefualtChips = () => {
  chosenChipsEl.classList.add('animate-closing');
  resultsEl.classList.add('animate-closing');
  removeWinnerEffs();
  // show default chips on animation end
  chosenChipsEl.addEventListener('animationend', () => {
    chosenChipsEl.classList.add('hidden');
    chosenChipsEl.classList.remove('animate-closing');
    resultsEl.classList.add('hidden');
    resultsEl.classList.remove('animate-opening', 'animate-closing');
    defaultChipsEl.classList.remove('hidden');
  }, {
    once: true // runs event only once
  });
  // remove selected class from the previously selected chip,
  // after default chips has finished opening animation
  defaultChipsEl.addEventListener('animationend', removeSelectedClass, {
    once: true
  });
};

// hide default chips and then show chosen chips
const displayChosenChips = () => {
  const userChipSrOnlyEl = chosenChipsEl.querySelector('.chosen-chips__user .sr-only');
  const houseChipSrOnlyEl = chosenChipsEl.querySelector('.chosen-chips__house .sr-only');
  // update chosen chips styles
  userChipEl.dataset.chipValue = userChoice;
  houseChipEl.dataset.chipValue = houseChoice;
  // add screen reader only classes
  userChipSrOnlyEl.textContent = userChoice;
  houseChipSrOnlyEl.textContent = houseChoice;
  // hide default chips
  defaultChipsEl.classList.add('no-btn-effs', 'animate-closing');
  // show chosen chips on animation end
  defaultChipsEl.addEventListener('animationend', () => {
    defaultChipsEl.classList.add('hidden');
    defaultChipsEl.classList.remove('no-btn-effs', 'animate-closing');
    chosenChipsEl.classList.remove('hidden');
  }, {
    once: true
  });
};

// display results
const displayResults = () => {
  const resultsTitleEl = resultsEl.querySelector('.results__title');
  const btnReplay = resultsEl.querySelector('#btn-replay');
  const resultsObj = getResults();
  resultsTitleEl.textContent = resultsObj.resultString;
  // replay game on click
  btnReplay.addEventListener('click', displayDefualtChips, {
    once: true // add EventListener only once
  });
  // show results after chosen chips finish opening animation
  chosenChipsEl.addEventListener('animationend', () => {
    resultsEl.classList.remove('hidden');
    resultsEl.classList.add('animate-opening');
  }, {
    once: true
  });
  // update score and show winner after results opening animation end
  resultsEl.addEventListener('animationend', () => {
    displayWinner(resultsObj.resultPoint);
    updateScore(resultsObj.resultPoint);
  }, {
    once: true
  });
};

// generate random CPU choice
const getHouseChoice = () => {
  const numberOfChoices = allChipBtnEls.length;
  const randomNumber = Math.floor(Math.random() * numberOfChoices);
  const choice = allChipBtnEls[randomNumber].dataset.chipValue;
  return choice;
};

// run game
const runGame = (e) => {
  userChoice = e.target.dataset.chipValue;
  houseChoice = getHouseChoice();
  // make clicked item stay on top
  e.target.parentNode.classList.add('selected');
  displayChosenChips();
  displayResults();
};

// add click event to all chip buttons
allChipBtnEls.forEach(chipBtn => chipBtn.addEventListener('click', runGame));