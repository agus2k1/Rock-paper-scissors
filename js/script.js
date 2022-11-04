const icons = document.querySelectorAll(".icon");
const computerIcon = document.getElementById("computerIcon");
const subtitle = document.getElementById("subtitle");
const message = document.getElementById("message");
const vsMessage = document.getElementById("vs");
const restartButton = document.getElementById("restartButton");
const scores = document.querySelectorAll(".score");
const playerScore = document.getElementById("playerScore");
const computerScore = document.getElementById("computerScore");
let randomNum = Math.random() * 8 + 10;
let playerChoice;
let computerChoice;
let playerWins;
let playerPoints = 0;
let computerPoints = 0;
let counter = 0;

startGame();

function startGame() {
    counter = 0;
    iconsAnimation();
}

function iconsAnimation() {
    timer = function () {
        icons[counter].classList.remove("hide");
        icons[counter].classList.add("show-up-right");
        counter++;
        if (counter < icons.length){
            setTimeout(iconsAnimation, 10);
        } else {
            setTimeout(() => {
                icons.forEach(icon => {
                    icon.classList.remove("show-up-right");
                    icon.addEventListener("click", handleClick, { once: true });
                })
            }, 1000);
        }
    }
    timer();
}

function handleClick(e) {
    playerChoice = e.currentTarget.id;
    this.classList.add("active");
    this.classList.remove("hvr-float");
    this.classList.add("icon-anim");
    icons.forEach(icon => {
        if (!icon.classList.contains("active")){
            icon.classList.add("hide");
        }
    })
    computerSelection();
    showAndHideFunctionalities();
    startingAnimations();
}

function computerSelection() {
    const iconsArr =  [...icons];
    let startIndex = Math.floor(Math.random() * 5);
    let interval = 12;
    randomSelection(iconsArr, startIndex, interval);
}

function randomSelection(arr, index, interval) { 
    timer = function() {
        interval += Math.floor(randomNum);
        computerIcon.classList.remove("hide");
        computerIcon.innerHTML = `<img src="images/${arr[index].id}.png">`;
        if (index == arr.length - 1){
            index = 0;
        } else {
            index++;
        }
        if (interval <= 230){
            setTimeout(timer, interval);
            computerChoice = arr[index].id;
        } else {
            setTimeout(endRound, 2000);
            if (checkWhoWon(playerChoice) == "player"){
                document.body.classList.add("bk-to-green");
                subtitle.children[2].innerHTML = "YOU WIN!";
                playerPoints++;
            } else if (isDraw()){
                subtitle.children[2].innerHTML = "DRAW";
                message.innerHTML = "";
            } else {
                checkWhoWon(computerChoice);
                document.body.classList.add("bk-to-red");
                subtitle.children[2].innerHTML = "YOU LOSE";
                computerPoints++;
            }
            playerScore.innerHTML = playerPoints;
            computerScore.innerHTML = computerPoints;
            endRoundAnimations();
            updateScore();
        }
    }
    timer();
}

function isDraw() {
    if (playerChoice == computerChoice){
        return true;
    } else {
        return false;
    }
}

function endRound() {
    subtitle.children[2].classList.remove("show-up-right");
    subtitle.children[2].classList.add("fade-off-down");
    message.classList.add("fade-off-down");
    computerIcon.classList.add("go-right-to-center");
    vsMessage.classList.add("dissapear");
    subtitle.children[3].classList.remove("hide");
    subtitle.children[3].classList.add("show-up-right");
    restartButton.classList.remove("hide");
    restartButton.classList.add("text-opacity");
    icons.forEach(icon => {
        if (icon.classList.contains("active")){
            icon.classList.add("icon-margin-right");
            icon.classList.add("go-left-to-center");
        }
    })
    restartButton.addEventListener("click", restartGame);
}

function restartGame() {
    scores.forEach(score => {
        score.children[0].classList.add("hide");
        score.children[1].classList.add("hide");
    });
    document.body.classList.remove("bk-to-green");
    document.body.classList.remove("bk-to-red");
    vsMessage.classList.add("hide");
    vsMessage.classList.remove("dissapear");
    restartButton.classList.add("hide");
    subtitle.children[3].classList.remove("show-up-right");
    subtitle.children[3].classList.add("fade-off-down");
    subtitle.children[0].classList.remove("fade-off-down");
    subtitle.children[0].classList.add("show-up-right");
    computerIcon.classList.remove("icon-anim-reverse");
    computerIcon.classList.remove("go-right-to-center");
    computerIcon.classList.add("hide");
    message.classList.remove("fade-off-down");
    message.innerHTML = "Make your selection";
    icons.forEach(icon => {
        if (icon.classList.contains("active")){
            icon.classList.remove("active");
            icon.classList.remove("icon-anim");
            icon.classList.remove("icon-margin-right");
            icon.classList.remove("go-left-to-center");
            icon.classList.add("hvr-float");
        }
    })
    startGame();
}

function showAndHideFunctionalities() {
    computerIcon.classList.remove("hide");
    computerIcon.classList.add("active");
    message.classList.add("hide");
    vsMessage.classList.remove("hide");
}

function startingAnimations() {
    computerIcon.classList.add("icon-anim-reverse");
    subtitle.children[0].classList.remove("show-up-right");
    subtitle.children[0].classList.add("fade-off-down");
    subtitle.children[1].classList.remove("hide");
    subtitle.children[1].classList.add("show-up-right");
}

function endRoundAnimations() {
    message.classList.remove("hide");
    subtitle.children[1].classList.remove("show-up-right");
    subtitle.children[1].classList.add("fade-off-down");
    subtitle.children[2].classList.remove("hide");
    subtitle.children[2].classList.add("show-up-right");
    updateScore();
}

function updateScore() {
    scores.forEach(score => {
        score.children[0].classList.remove("hide");
        score.children[1].classList.remove("hide");
        score.children[1].classList.add("points-animation");
        setTimeout(() => {
            score.children[1].classList.remove("points-animation");
        }, 2000); 
    });
}

function checkWhoWon(choice) {
    let possibleWinner;
    let vsChoice;
    let verb;
    if (choice == playerChoice){
        possibleWinner = "player";
        vsChoice = computerChoice;
    } else {
        possibleWinner = "computer";
        vsChoice = playerChoice;
    }
    switch(choice) {
        case "rock":
        if (vsChoice == "scissors" || vsChoice == "lizard"){
            win = true;
            verb = "crushes";
            break;
        } else {
            win = false;
            break;
        }
        case "paper":
        if (vsChoice == "rock" || vsChoice == "Spock"){
            win = true;
            vsChoice == "rock" ? verb = "covers" : verb = "disproves";
            break;
        } else {
            win = false;
            break;
        }
        case "scissors":
        if (vsChoice == "paper" || vsChoice == "lizard"){
            win = true;
            vsChoice == "paper" ? verb = "cuts" : verb = "decapitates";
            break;
        } else {
            win = false;
            break;
        }
        case "lizard":
        if (vsChoice == "paper" || vsChoice == "Spock"){
            win = true;
            vsChoice == "paper" ? verb = "eats" : verb = "poisons";
            break;
        } else {
            win = false;
            break;
        }
        case "Spock":
        if (vsChoice == "rock" || vsChoice == "scissors"){
            win = true;
            vsChoice == "rock" ? verb = "vaporizes" : verb = "smashes";
            break;
        } else {
            win = false;
            break;
        }
        default:
            win = false;
    }
    if (win){
        message.innerHTML = `${choice} ${verb} ${vsChoice}`;
        return possibleWinner;
    } else {
        return undefined;
    }
}

