function getComputerChoice() {
    const possibleChoices = ["paper", "rock", "scissors"]
    const randomNumber = Math.floor(Math.random() * 3)
    return possibleChoices[randomNumber]
}

function capitalize(string) {
    return string[0].toUpperCase() + string.substring((1))
}

let computerChoice = getComputerChoice();
let playerChoice = "Paper".toLowerCase();

console.log(computerChoice)
console.log(playerChoice)

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

console.log(playRound(playerChoice, computerChoice))

/* const playerSelection = "Paper".toUpperCase()

function playRound(playerSelection, computerSelection) {
    const computerSelection = getComputerChoice();
    let playerScore = 0;
    let computerScore = 0;
    let result;

    if ((playerSelection === "PAPER" && computerSelection === "ROCK") || 
        (playerSelection === "ROCK" && computerSelection === "SCISSORS") ||
        (playerSelection === "SCISSORS" && computerSelection === "PAPER")) {
        playerScore ++;
        result = `You win ! ${playerSelection} beats ${computerSelection}`
        return 
    } else if (playerSelection === computerSelection) {
        result = `It's a tie !`
    } else {
        computerScore ++;
        result = `You lose ! ${computerSelection} beats ${playerSelection} `
        return
    }
}

/* function game() {
    for (let i = 0; i < 5; i++) {
        playRound(playerSelection, computerSelection)
        console.log(playerScore)
        console.log(computerScore)
        console.log(result)
    }
} */