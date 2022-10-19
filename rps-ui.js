const villainHealthBar = document.getElementById("villain-health-bar")
const heroHealthBar = document.getElementById("hero-health-bar")

const heroContainer = document.getElementById("hero-container")
const villainContainer = document.getElementById("villain-container")

const villainSprite = document.getElementById("villain-img")
const heroSprite = document.getElementById("hero-img")

const villainActionImg = document.getElementById("villain-choice")
const heroActionImg = document.getElementById("hero-choice")

const restartBtn = document.getElementById("restart-btn")
const roundTextContainer = document.getElementById("round-result")
const playerPrompt = document.getElementById("player-prompt")

const weaponsBtn = document.querySelectorAll("input.weapons-btn")

const sword = "./images/sword.jpg"
const crossbow = "./images/crossbow.jpg"
const axe = "./images/axe.jpg"

let roundResult

const intervalTextAppeareance = 1800
const intervalButtonDisabled = 2000
const intervalDamageAnimation = 1000
const intervalHealthBarLoss = 1000
const intervalDeathAnimation = 1000
const intervalPlayAgainMessage = 2000


function actor(hp, dom, choice) {
    this.hp = hp,
    this.dom = dom,
    this.choice = choice
}

function weaponStringToJS(string) {
    if (string === "sword") {
        return sword
    } else if (string === "crossbow") {
        return crossbow
    } else if (string === "axe") {
        return axe
    }
}

const hero = new actor(5, heroHealthBar)
const villain = new actor(5, villainHealthBar)

function game(playerChoice) {
    villain.choice = getComputerChoice();
    hero.choice = playerChoice;
    playChoiceAnimation(villainActionImg, weaponStringToJS(villain.choice))
    playChoiceAnimation(heroActionImg, weaponStringToJS(hero.choice))
    compareChoice(hero.choice, villain.choice);
    playRound(roundResult);
    checkWinner()
}

function getComputerChoice() {
    const possibleChoices = ["sword", "crossbow", "axe"];
    const randomNumber = Math.floor(Math.random() * 3);
    return possibleChoices[randomNumber];
}

function playChoiceAnimation(actorActionImg, weapon) {
    actorActionImg.src = weapon
    actorActionImg.classList.add("weapon-chosen")
    void actorActionImg.offsetWidth;
    setTimeout(() => {
        actorActionImg.classList.remove("weapon-chosen") },
        2000)
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

function playRound(victoryState) {
    disableWeaponsBtn()
    if (victoryState === "playerVictory") {
        villain.hp --
        announceText("Hero strikes !")
        villain.hp != 0 && playDamageAnimation(villainSprite)
        modifyHealthBar(villain)
    } else if (victoryState === "playerLoss") {
        hero.hp --
        announceText("Ennemy strikes !")
        hero.hp !=0 && playDamageAnimation(heroSprite)
        modifyHealthBar(hero)
    } else {
        announceText("It's a tie !")
    }
}

function disableWeaponsBtn() {

    weaponsBtn.forEach((input) => {
        input.disabled = true;
        input.classList.add("greyed-out") })

    setTimeout(() => {
        weaponsBtn.forEach((input) => {
        input.disabled = false;
        input.classList.remove("greyed-out") } ) 
    }, intervalButtonDisabled)
}

function announceText(string) {
    setTimeout(() => {
        roundTextContainer.style.opacity = 1
        roundTextContainer.textContent = string
    }, intervalTextAppeareance)
}

function playDamageAnimation(sprite) {
    setTimeout(() => {
        sprite.classList.add("damaged")
        void sprite.offsetWidth;
        setTimeout(() => {
            sprite.classList.remove("damaged") },
            intervalDamageAnimation)
    }, intervalDamageAnimation)
}

function modifyHealthBar(loser) {
    setTimeout(() => {
        loser.dom.style.width = (20 * loser.hp) + "%"
    }, intervalHealthBarLoss)
}

function checkWinner() {

    if (villain.hp === 0 || hero.hp === 0) {

        setTimeout(() => {
            weaponsBtn.forEach((input) => {
            input.disabled = true
            input.classList.add("greyed-out")
        })}, (intervalButtonDisabled + 1))

        if (villain.hp === 0) {
            playDeathAnimation(villainContainer)
        } else if (hero.hp === 0) {
            playDeathAnimation(heroContainer)
        }

        setTimeout(() => {
            playerPrompt.textContent = "play again ?"
            playerPrompt.style.cursor = "pointer"
            playerPrompt.addEventListener("click", resetGame)
        }, intervalPlayAgainMessage)

        setTimeout(() => {
            roundTextContainer.classList.add("fade-out")
            void roundTextContainer.offsetWidth
        }, 5000)
    }
}

function playDeathAnimation(sprite) {
    setTimeout(() => {
        sprite.classList.add("dead")
        void sprite.offsetWidth;
    }, intervalDeathAnimation)
}

function resetGame() {
    villain.hp = 5;
    hero.hp = 5;
    playerPrompt.removeEventListener("click", resetGame)
    modifyHealthBar(villain)
    modifyHealthBar(hero)
    weaponsBtn.forEach((input) => {
        input.disabled = false
        input.classList.remove("greyed-out")
    });
    playerPrompt.textContent = "what will you do ?"
    playerPrompt.style.cursor = ""
    villainContainer.classList.remove("dead")
    heroContainer.classList.remove("dead")
    roundTextContainer.classList.remove("fade-out")
    roundTextContainer.style.opacity = 0
}