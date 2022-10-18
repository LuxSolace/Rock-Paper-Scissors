const villainHealthBar = document.getElementById("villain-health-bar")
const heroHealthBar = document.getElementById("hero-health-bar")

const villainSprite = document.getElementById("villain-img")
const heroSprite = document.getElementById("hero-img")

const villainAction = document.getElementById("villain-choice")
const heroAction = document.getElementById("hero-choice")

const restartBtn = document.getElementById("restart-btn")
const roundTextContainer = document.getElementById("round-result")
const playerPrompt = document.getElementById("player-prompt")

const sword = "./images/sword.jpg"
const crossbow = "./images/crossbow.jpg"
const axe = "./images/axe.jpg"

let roundResult

function actor(hp, dom, choice) {
    this.hp = hp,
    this.dom = dom,
    this.choice = choice
}

/* dom initialized */

const hero = new actor(5, heroHealthBar)
const villain = new actor(5, villainHealthBar)

function playDamageAnimation(sprite) {
    setTimeout(function() {
    sprite.classList.add("damaged")
    void sprite.offsetWidth;
    setTimeout(function() {
        sprite.classList.remove("damaged") },
        1000)
    }, 1000)
}

function playChoiceAnimation(actor, weapon) {
    actor.src = weapon
    actor.classList.add("weapon-chosen")
    void actor.offsetWidth;
    setTimeout(function() {
        actor.classList.remove("weapon-chosen") },
        2000)
}

function announceText(string) {
    setTimeout(function() {
        roundTextContainer.style.opacity = 1
        roundTextContainer.textContent = string
    }, 1800)
}

/* function playTextAnimation(text) {
    roundTextContainer.textContent = text
    roundTextContainer.classList.add("text-appeared")
    void roundTextContainer
    setTimeout(function() {
        roundTextContainer.classList.remove("text-appeared") },
        3000)
} */

function getComputerChoice() {
    const possibleChoices = ["sword", "crossbow", "axe"];
    const randomNumber = Math.floor(Math.random() * 3);
    return possibleChoices[randomNumber];
}

function compareChoice(playerSelection, computerSelection) {
    if ((playerSelection === "sword" && computerSelection === "crossbow") || 
    (playerSelection === "crossbow" && computerSelection === "axe") ||
    (playerSelection === "axe" && computerSelection === "sword")) {
        return roundResult = "playerVictory"
    } else if (playerSelection === computerSelection) {
        return roundResult = "tie"
    } else {
        return roundResult = "playerLoss"
    }
}

function modifyHealthBar(loser) {
    setTimeout(function() {
        loser.dom.style.width = (20 * loser.hp) + "%"
    }, 1000)
}

function playRound(victoryState) {
    disableWeaponsBtn(2000)
    if (victoryState === "playerVictory") {
        villain.hp --
        announceText("Hero strikes !")
        if (villain.hp != 0) {playDamageAnimation(villainSprite)}
        modifyHealthBar(villain)
    } else if (victoryState === "playerLoss") {
        hero.hp --
        announceText("Ennemy strikes !")
        if (hero.hp !=0) {playDamageAnimation(heroSprite)}
        modifyHealthBar(hero)
    } else {
        announceText("It's a tie !")
    }
}

function disableWeaponsBtn(interval) {
    document.querySelectorAll("input.weapons-btn").forEach(function(input) {
        input.disabled = true;
        input.classList.add("greyed-out"); })

    setTimeout(function() {
    document.querySelectorAll("input.weapons-btn").forEach(function(input) {
        input.disabled = false;
        input.classList.remove("greyed-out")
    }) }, interval)
}

function playDeathAnimation(sprite) {
    setTimeout(function() {
        sprite.classList.add("dead")
        void sprite.offsetWidth;
    }, 1000)
}

function checkWinner() {
    if (villain.hp === 0 || hero.hp === 0) {

        setTimeout(function() {
            document.querySelectorAll("input.weapons-btn").forEach(function(input) {
            input.disabled = true
            input.classList.add("greyed-out")
        })}, 2001)

        if (villain.hp === 0) {
            playDeathAnimation(villainSprite)
        } else if (hero.hp === 0) {
            playDeathAnimation(heroSprite)
        }

        setTimeout(function() {
            playerPrompt.textContent = "play again ?"
            playerPrompt.style.cursor = "pointer"
            playerPrompt.addEventListener("click", resetGame)
        }, 2000)
    }
}

function game(playerChoice) {
    villain.choice = getComputerChoice();
    hero.choice = playerChoice;
    playChoiceAnimation(villainAction, eval(villain.choice))
    playChoiceAnimation(heroAction, eval(hero.choice))
    compareChoice(hero.choice, villain.choice);
    playRound(roundResult);
    checkWinner()
}

function resetGame() {
    playerPrompt.removeEventListener("click", resetGame)
    document.querySelectorAll("input.weapons-btn").forEach(input => input.disabled = false);
    villain.hp = 5;
    hero.hp = 5;
    modifyHealthBar(villain)
    modifyHealthBar(hero)
    playerPrompt.textContent = "what will you do ?"
    playerPrompt.style.cursor = ""
    villainSprite.classList.remove("dead")
    heroSprite.classList.remove("dead")
}