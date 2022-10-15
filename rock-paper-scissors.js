function getComputerChoice() {
    const possibleChoices = ["paper", "rock", "scissors"];
    const randomNumber = Math.floor(Math.random() * 3);
    return possibleChoices[randomNumber];
}

function getPlayerChoice() {
    return prompt("Please choose Paper, Rock or Scissors :)").toLowerCase();
}

function capitalize(string) {
    return string[0].toUpperCase() + string.substring((1));
}

let computerChoice
let playerChoice

function playRound(playerSelection, computerSelection) {

    if ((playerSelection === "paper" && computerSelection === "rock") || 
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "scissors" && computerSelection === "paper")) {
        return `You win ! ${capitalize(playerSelection)} beats ${computerSelection}.`
    } else if (playerSelection === computerSelection) {
        return `It's a tie !`
    } else {
        return `You lose ! ${capitalize(computerSelection)} beats ${playerSelection}. `
    }
 
}

function game() {

    for (let i = 0; i < 5; i++) {
        computerChoice = getComputerChoice();
        playerChoice = getPlayerChoice();
        console.log(playRound(computerChoice, playerChoice))
    }
}

game()