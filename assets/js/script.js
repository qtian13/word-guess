var wordArray;
var indexOfCurrentWord;
var numWrongChar;
var validInput = "abcdefghijklmnopqrstuvwxyz-";
var secondsLeft = 60;
var wordBox = document.querySelector(".word-box");
var elementToRemoveKeypressListner;
var numWins = 0;
var numLosses = 0;
var charSelected = null;

function startGame() {
    wordArray = ["elephant", "cat", "rabbit", "bee", "dog"];
    startTimer();
    startGuess();
}

function reset() {
    indexOfCurrentWord = 0;
    document.querySelector("#wins").textContent = "Wins: 0";
    document.querySelector("#losses").textContent = "Losses: 0";
    document.querySelector("#time-left").textContent = "TIME LEFT: " + secondsLeft + "s";

}

function startTimer(){
    var myInterval = setInterval(function() {
        secondsLeft--;
        document.querySelector("#time-left").textContent = "TIME LEFT: " + secondsLeft + "s";
    }, 1000 * 1);
    setTimeout(function () {
        clearInterval(myInterval);
        if (indexOfCurrentWord != wordArray.length) {
            numLosses++;
            document.querySelector("#losses").textContent = "Losses: " + numLosses;
        }
    }, 1000 * 60);
}

function startGuess() {
    var currentWord = wordArray[indexOfCurrentWord];
    numWrongChar = currentWord.length;
    wordBox.innerHTML = "";
    for(var i = 0; i < currentWord.length; i++) {
        var element = document.createElement("div");
        element.setAttribute("data-expected", currentWord[i]);
        element.setAttribute("data-guessed", "false");
        element.setAttribute("class", "character");
        element.setAttribute("id", "character" + i);
        element.setAttribute("style", "font-size: 30px; border-bottom: 2px solid black; width: 40px; height: 40px; display: flex; justify-content: center; margin: 5px;");
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
                if (indexOfCurrentWord != wordArray.length) {
                    startGuess();
                } else {
                    numWins++;
                    document.querySelector("#wins").textContent = "Wins: " + numWins;
                }
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
