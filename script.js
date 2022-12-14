const textWrapper = document.querySelector('.text-wrapper');
const textArea = document.querySelector('#textArea');
const text = document.querySelector('.origin-text');
const quotes = ['I love citrus fruits even though I have never tried most of them.', 'Most people know about lemon, lime or grapefruit. But it is just the tip of the iceberg. There is more then 100 different types of ctirus.',
'You cannot really overdose vitamin C.','Every single lemonade recipe I have ever seen had sugar as one of the ingredients. I prefer my lemonade without it.', 'I would love to try more citrus fruits but it is hard to find them in the shops.',
'I think that citrus are underrated.'];
const resetButton = document.querySelector('#reset');
const theTimer = document.querySelector('.timer');
const checkbox = document.querySelector('#checkbox');

textArea.addEventListener('keypress', start, false);
textArea.addEventListener('keyup', check, false);
resetButton.addEventListener('click', reset, false);
resetButton.addEventListener('click', displayText, false); 
document.addEventListener('DOMContentLoaded', displayText, false);
checkbox.addEventListener('change', ()=>{
    document.body.classList.toggle('dark');
});

let time = 0;
let timer = [0,0,0,0];
let interval;
let givenText;
let timeRunning = false;

//Display random quote from quotes array
function displayText(){
    givenText = quotes[Math.floor(Math.random() * quotes.length)];
    text.innerHTML = givenText;  
}


//Add leading zeros in time if the time value is lower then 10. For example: 7 seconds will be displayed as "07"
function leadingZeros(time){
    if(time <= 9){
        time = '0' + time;
    }

    return time;
}

//Create and run timer
function runTimer(){
    let time = leadingZeros(timer[0]) + ':' + leadingZeros(timer[1]) + ':' + leadingZeros(timer[2]);
    theTimer.innerHTML = time;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

//Set the game to its default state
function reset(){
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    timeRunning = false;
    time = 0;
    
    textArea.value = '';
    theTimer.innerHTML = '00:00:00';
    textWrapper.style.borderColor = 'blueviolet';
}


//Run timer when user starts typing
function start(){
    let textEnteredLength = textArea.value.length;
    if(textEnteredLength === 0){
        timeRunning = true;
        interval = setInterval(runTimer, 10);
    }
}


//Function that check the game state
function check(){
    let textEntered = textArea.value;
    let givenTextCorrect = givenText.substring(0, textEntered.length);

    //If text entered by player is equal to given text end the game and stop the timer
    if(textEntered === givenText)
    {
        textWrapper.style.borderColor = 'orange';
        clearInterval(interval);

    }else{
        //If user is typing corectly set border color to green
        if(textEntered == givenTextCorrect)
        {
            textWrapper.style.borderColor = 'green';
        }
        //If user make a mistake set border color to red
        else{
            textWrapper.style.borderColor = 'red';
        }
    }
}
