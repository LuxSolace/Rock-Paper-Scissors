function getComputerChoice() {
    const possibleChoices = ["PAPER", "ROCK", "SCISSORS"]
    const randomNumber = Math.floor(Math.random() * 3)
    return possibleChoices[randomNumber]
}

const computerSelection = getComputerChoice();
const playerSelection = "Paper".toUpperCase()

if ((playerSelection === "PAPER" && computerSelection === "ROCK") || 
    (playerSelection === "ROCK" && computerSelection === "SCISSORS") ||
    (playerSelection === "SCISSORS" && computerSelection === "PAPER")) {
        console.log("Player wins !")
} else if (playerSelection === computerSelection) {
    console.log("It's a tie !")
} else {
    console.log("Computer wins !")
}