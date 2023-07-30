let randomNumber = parseInt(Math.random()*100+1);

// Document selection
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses'); 
const remaning = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;
let playGame = true;

if(playGame){
    submit.addEventListener('click',function(e){
      e.preventDefault();
      const guess = parseInt(userInput.value);
      validateGuess(guess);   
    }); 
}

function validateGuess(guess){
    if(isNaN(guess)){
        alert('Please Enter a Valid Number');
    }
    else if(guess < 1){
        alert('Please Enter a Number More Than 1');
    }
    else if(guess > 100){
        alert('Please Enter a Number upto 100');
    }
    else{
        prevGuess.push(guess);
        if(numGuess === 10){
            dispalyGuess(guess);
            dispalyMessage(`Game Over! Random Number was ${randomNumber}`)
            endGame()
            newGame()
        }
        else{
            dispalyGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    if(guess == randomNumber){
        dispalyMessage(`You guessed it right`)
        endGame();
    }
    else if(guess < randomNumber){
        dispalyMessage(`Number is TOOO Low`)
    }
    else if(guess > randomNumber){
        dispalyMessage(`Number is TOOO High`)
    }
}

function dispalyMessage(message){
    lowOrHi.innerHTML = `<h2>${message }</h2>`
}

function dispalyGuess(guess){
    userInput.value = '' ;
    guessSlot.innerHTML += `${guess}, `
    numGuess++;
    remaning.innerHTML =`${11-numGuess}`
}

function newGame(){
   const newGameButton = document.querySelector('#newGame');
   newGameButton.addEventListener('click', function(e){
    randomNumber = parseInt(Math.random()*100+1);
    prevGuess = [];
    numGuess = 1
    guessSlot.innerHTML = '';
    remaning.innerHTML =`${11-numGuess}`
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);
 
    playGame = true;
   })
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id = "newGame">Start New Game </h2>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}
