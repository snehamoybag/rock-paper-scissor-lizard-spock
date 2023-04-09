// stylesheet
import '/scss/styles.scss';

/* // GAME SCRIPTS // */
const defaultChipsEl = document.querySelector('#default-chips');
const allChipBtnEls = defaultChipsEl.querySelectorAll('.chip');

// game logic
const getResults = (userChoice, houseChoice) => {
  console.log(userChoice, houseChoice);
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

  return {
    resultPoint,
    resultString
  };
};

//update score on DOM
const updateScore = (result) => {
  const scoreEl = document.querySelector('#score-points');
  scoreEl.textContent = Number(scoreEl.textContent) + result;
}

// display choices on DOM
const displayChosenChips = (userChoice, houseChoice) => {
  const chosenChipsEl = document.querySelector('#chosen-chips');
  const userChipEl = chosenChipsEl.querySelector('#user-chip');
  const houseChipEl = chosenChipsEl.querySelector('#house-chip');
  // display chosen chips
  userChipEl.dataset.chipValue = userChoice;
  houseChipEl.dataset.chipValue = houseChoice;
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