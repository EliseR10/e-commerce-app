console.log('hi');
const getUserChoice = userInput => {
  userInput = userInput.toLowerCase();

  if (userInput === 'rock') {
    return userInput;
  } else if (userInput === 'paper'){
    return userInput;
  } else if (userInput === 'scissors'){
    return userInput;
  } else if (userInput === 'bomb'){
    return userInput;
  } else {
    console.log('Please put a valid choice.');
  }
}
/*console.log(getUserChoice('pen'));*/

let getComputerChoice = () => {
  const randomNumber = Math.floor(Math.random() * 3);

  switch (randomNumber) {
    case 0:
      return 'rock';
    case 1:
      return 'paper';
    case 2:
      return 'scissors';
  }
  }

/*console.log(getComputerChoice());
console.log(getUserChoice('rock'));*/

function determineWinner (userChoice, computerChoice) {
  if (userChoice === 'bomb') {
    return 'You won!';
  }

  if (userChoice === computerChoice){
    return 'The game was a tie';
  }

  if (userChoice === 'rock') {
    if (computerChoice === 'paper'){
      return 'The computer won!';
    } else {
      return 'You won!';
    }
  }

  if (userChoice === 'paper') {
    if (computerChoice === 'scissors') {
      return 'The computer won!';
    } else {
      return 'You won!';
    }
  }

  if (userChoice === 'scissors') {
    if (computerChoice === 'rock') {
      return 'The computer won!';
    } else {
      return 'You won!';
    }
  }
}

/*console.log(determineWinner('paper', 'scissors'));
console.log(determineWinner('paper', 'paper'));
console.log(determineWinner('paper', 'rock'));*/

const playGame = () => {
  const userChoice = getUserChoice('bomb');
  const computerChoice = getComputerChoice();
  console.log('You threw:' + userChoice); 
  console.log('The computer threw:' + computerChoice);
  console.log(determineWinner(userChoice, computerChoice));
};

playGame();