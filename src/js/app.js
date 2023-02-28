// STYLESHEET
import '/scss/styles.scss';

// GAME SCRIPTS
// DOM elements
const chips = document.querySelector('#chips');

// global variables
let userChip = null;
let houseChip = null;

// reusables functions
function generateHouseChip() {
  const values = [
    'rock',
    'paper',
    'scissors'
  ];
  return values[Math.floor(Math.random() * values.length)];
}

// add click events to all buttons
chips.addEventListener('click', (e) => {
  const clickTarget = e.target;
  if (clickTarget.hasAttribute('chip-value')) {
    userChip = e.target.getAttribute('chip-value');
    houseChip = generateHouseChip();
    console.log(userChip, houseChip);
    gameLogic();
  }
});

// game logic
function gameLogic() {
  if (!userChip) {
    return;
  } else if (userChip === houseChip) {
    console.log('It\'s a Draw');
  } else if (
    (userChip === 'rock' && houseChip === 'scissors') ||
    (userChip === 'paper' && houseChip === 'rock') ||
    (userChip === 'scissors' && houseChip === 'paper')
  ) {
    console.log('You Win!');
  } else {
    console.log('House Wins');
  }
}