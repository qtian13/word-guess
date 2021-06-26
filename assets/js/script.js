var wordArray;
var indexOfCurrentWord;
var numWrongChar;
var validInput = "abcdefghijklmnopqrstuvwxyz-";
var timeTotal = 15;
var secondsLeft = timeTotal;
var wordBox = document.querySelector(".word-box");
var elementToRemoveKeypressListner;
var numWins = 0;
var numLosses = 0;
var charSelected = null;
var myTimer;
var myInterval;

function startGame() {
    wordArray = ["dog", "cat", "elephant"];
    startTimer();
    startGuess();
}

function reset() {
    localStorage.setItem("wins", 0);
    localStorage.setItem("losses", 0);
    document.querySelector("#wins").textContent = "Wins: 0";
    document.querySelector("#losses").textContent = "Losses: 0";
    startNewRound();
}

function startNewRound() {
    clearTimeout(myTimer);
    clearTimeout(myInterval);
    indexOfCurrentWord = 0;
    wordBox.innerHTML = "";
    secondsLeft = timeTotal;
    document.querySelector("#time-left").textContent = "Time left: " + secondsLeft + "s";
}

function startTimer(){
    myInterval = setInterval(function() {
        secondsLeft--;
        document.querySelector("#time-left").textContent = "Time left: " + secondsLeft + "s";
    }, 1000 * 1);
    myTimer = setTimeout(function () {
        clearInterval(myInterval);
        displayLoss();
    }, 1000 * timeTotal);
}

function displayLoss() {
    numLosses++;
    document.querySelector("#losses").textContent = "Losses: " + numLosses;
    setTimeout(function() {
        var tryAgain = confirm("Time is up! Want to try again?");
        startNewRound();
        if (tryAgain) {
            startGame();
        } else {
            reset();
        }
    }, 1);
}

function startGuess() {
    var currentWord = wordArray[indexOfCurrentWord];
    numWrongChar = currentWord.length;
    for(var i = 0; i < currentWord.length; i++) {
        var element = document.createElement("div");
        element.setAttribute("data-expected", currentWord[i]);
        element.setAttribute("data-guessed", "false");
        element.setAttribute("class", "character");
        element.setAttribute("id", "character" + i);
        element.setAttribute("style", "border-bottom: 2px solid black; width: 40px; height: 40px; display: flex; justify-content: center; margin: 5px;");
        wordBox.appendChild(element);
    }
}

function selectPosition(clickEvent) {
    if (charSelected && (charSelected.dataset.guessed == "false")) {
        charSelected.style["border-bottom"] = "2px solid black";
    }
    var element = clickEvent.target;
    if (element.matches(".character") && (element.dataset.guessed == "false")) {
        charSelected = element;
        charSelected.style["border-bottom"] = "2px solid red";
    } else {
        charSelected = null;
        if (element.matches("#start-button")) {
            startNewRound();
            startGame();
        }
    }
}

function checkResult(char) {
    if (validInput.indexOf(char) < 0) {
        alert("Please enter a alphabet character!");
    } else {
        if (char == charSelected.dataset.expected) {
            charSelected.dataset.guessed = "true";
            charSelected.textContent = char;
            charSelected.style["border-bottom"] = "none";
            numWrongChar--;
            if (numWrongChar == 0) {
                indexOfCurrentWord++;
                setTimeout(function() {
                    if (indexOfCurrentWord != wordArray.length) {
                        wordBox.innerHTML = "";
                        startGuess();
                    } else {
                        var wins = parseInt(localStorage.getItem("wins"));
                        wins += 1;
                        localStorage.setItem("wins", wins++);
                        document.querySelector("#wins").textContent = "Wins: " + localStorage.getItem("wins");
                        setTimeout(function () {
                            alert("Congratulations! You win!");
                            startNewRound();
                        }, 1000 * 0.2);
                    }
                }, 1);
            }
        }   
    }
}
reset();
addEventListener("click", selectPosition);
addEventListener("keypress", function(keypressEvent) {
    var char = keypressEvent.key.toLowerCase();
    if (charSelected && (charSelected.dataset.guessed == "false")) {
        checkResult(char);
    }
})
