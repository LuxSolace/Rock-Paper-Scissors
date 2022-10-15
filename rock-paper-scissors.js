let computerChoice
let playerChoice
let roundResult

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

function playRound(playerSelection, computerSelection) {

    if ((playerSelection === "paper" && computerSelection === "rock") || 
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "scissors" && computerSelection === "paper")) {
        return roundResult = "player won"
    } else if (playerSelection === computerSelection) {
        return roundResult = "tie"
    } else {
        return roundResult = "player lost"
    }
 
}

function checkWinner(player, computer) {
    if (player > computer) {
        console.log("Player won !!! :)")
    } else if (player < computer) {
        console.log("Computer won. ):")
    } else {
        console.log("It's a tie. :/")
    }
}

function game() {

    let playerScore = 0
    let computerScore = 0

    for (let i = 0; i < 5; i++) {

        computerChoice = getComputerChoice();
        playerChoice = getPlayerChoice();
        playRound(playerChoice, computerChoice)

        if (roundResult === "player won") {
            playerScore ++
            console.log(`You win ! ${capitalize(playerChoice)} beats ${computerChoice}. Player score : ${playerScore} / Computer score : ${computerScore}`)
        } else if (roundResult === "tie") {
            console.log(`It's a tie ! Player score : ${playerScore} / Computer score : ${computerScore}`)
        } else {
            computerScore ++
            console.log(`You lose ! ${capitalize(computerChoice)} beats ${playerChoice}. Player score : ${playerScore} / Computer score : ${computerScore}`)
        }

    }

    checkWinner(playerScore, computerScore)
}

game()