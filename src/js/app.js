// stylesheet
import '/scss/styles.scss';

/* // GAME SCRIPTS // */
const defaultChipsEl = document.querySelector('#default-chips');
const allChipBtnEls = defaultChipsEl.querySelectorAll('.chip');

// display choices on DOM
const displayChosenChips = (userChoice, houseChoice) => {
  console.log('user choice :' + userChoice + ", house choice :" + houseChoice);
  const chosenChipsEl = document.querySelector('#chosen-chips');
  const userChipEl = chosenChipsEl.querySelector('#user-chip');
  const houseChipEl = chosenChipsEl.querySelector('#house-chip');

  userChipEl.classList.add(`chip--${userChoice}`);
  houseChipEl.classList.add(`chip--${houseChoice}`);
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
};

// add click event to all chip buttons
allChipBtnEls.forEach(chipBtn => chipBtn.addEventListener('click', runGame));