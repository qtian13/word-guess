var wordArray;
var indexOfCurrentWord;
var validInput = "abcdefghijklmnopqrstuvwxyz-";
var secondsLeft = 60;
// word-box:
// the original display _ _ a _ _

function startGame() {
    wordArray = ["elephant", "cat", "rabbit", "bee", "dog"];
    indexOfCurrentWord = 0;
    document.querySelector("#wins").textContent = "Wins: 0";
    document.querySelector("#losses").textContent = "Losses: 0";
    document.querySelector("#time-left").textContent = "TIME LEFT: " + secondsLeft + "s";
    startTimer();
    startGuess();
}

function startTimer(){
    var myInterval = setInterval(function() {
        secondsLeft--;
        document.querySelector("#time-left").textContent = "TIME LEFT: " + secondsLeft + "s";
    }, 1000 * 1);
     setTimeout(function() {
        clearInterval(myInterval);
    }, 1000 * 60);
}

// this piece works
// setInterval(function() {
//     console.log("I am executed");
//     secondsLeft--;
//     document.querySelector("#time-left").textContent = "TIME LEFT: " + secondsLeft + "s";
// }, 1000 * 1);

function startGuess() {
    console.log("stratGuess executed");

    var currentWord = wordArray[indexOfCurrentWord];
    for(var i = 0; i < currentWord.length; i++) {
        var element = document.createElement("div");
        element.setAttribute("data-expected", currentWord[i]);
        element.setAttribute("class", "character");
        element.setAttribute("style", "font-size: 10px; border-bottom: 2px solid black; width: 15px; height: 15px");
        element.textContent = "I";
    }
}

function displayWord(word) {
    // for(word.length)
    // createElemetn(span) 
    // span.textContent = word[i];

}
// when keypress, check if the result is correct:

function checkResult(event) {
    var charEntered = event.key.toLowerCase();
    if (validInput.indexOf(charEntered) < 0) {
        alert("Please enter a alphabet character!");
    } else {
        // if entered the expected letter    
        //correct: display the letter and delete the underscore

        //if all the letters are displayed
        if (true) {
            // check if there are more words
            if (checkWordRemain) {
                generateNewWord();
            }
            else {
                updateWinResult();
            }
        }
    }
}
function checkWordRemain() {

}
function generateNewWord() {

}
function updateWinResult() {

}
startGame();
document.addEventListener("keypress", checkResult);




// result-box
// Time left: 1 timeout and 1 interval
// wins: all letters displayed, count++, display the count as text content
// store the value to local storage
// losses: timeout, count++, display the count as text content
// store the value to local storage
