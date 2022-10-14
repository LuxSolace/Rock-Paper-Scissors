function getComputerChoice() {
    const possibleChoices = ["Paper", "Rock", "Scissors"]
    const randomNumber = Math.floor(Math.random() * 3)
    return possibleChoices[randomNumber]
}

const computerSelection = getComputerChoice();
console.log(computerSelection)