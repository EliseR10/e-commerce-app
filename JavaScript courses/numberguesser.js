let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

//Create a random Target
const generateTarget = () => {
  return Math.floor(Math.random() * 10);
}
//console.log(generateTarget());

//Create a function to compare the two guesses
const compareGuesses = (humanGuess, computerGuess, targetGuess) => {
  const humanDifference = Maths.abs(targetGuess - humanGuess);
  const computerDifference = Maths.abs(targetGuess - computerGuess);

  if (humanDifference <= computerDifference) {
    return true;
  } else {
    return false;
  }
}

//Update Score
const updateScore = winner => {
  if (winner === 'human') {
    humanScore ++;
  } else if (winner === 'computer') {
    computerScore++;
  }
}

//Update the Current Round Number
const advanceRound = () => currentRoundNumber ++;