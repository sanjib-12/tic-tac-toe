const buttons = document.querySelectorAll(".square");
const newGameButton = document.getElementById('new-game-button');
const playerDescription = document.querySelector('.status');
const historyButtons = document.querySelector('.game-info');
//let showHistoryMoves =document.querySelectorAll('.moves');


let squares = Array(9).fill(null);
let history = [];
let historyIndex = 0;

console.log(history);

const numberMap ={
    "one":1,
    "two":2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven" : 7,
    "eight" : 8,
    "nine" : 9
    
};

let player = null;

newGameButton.addEventListener('click',()=>{
    
    const firstPlayerSelection = Math.random().toFixed()
    //console.log(firstPlayerSelection)
    if(firstPlayerSelection == 0){
        player = 'o';
    }else{
        player = 'x';
    }
    console.log(player)

    buttons.forEach(button =>{
        button.textContent='';
    })

    squares = Array(9).fill(null);
    history = [];
    historyIndex = 0;
    deleteAllHistory();
    playerDescription.textContent = 'Player ' + player + "'s turn";

})



buttons.forEach(button =>{
    button.addEventListener('click', (event)=>{
        let currentSquare = null;
        const clickedSquare = event.target;
        const clickedSquareInNumber = convertStringToNumber(clickedSquare.id)
        console.log(clickedSquareInNumber)
        if(!clickedSquare.textContent){

            clickedSquare.textContent = player;
            squares[clickedSquareInNumber-1] = player
            console.log(squares)
            const winner = calculateWinner();
            if (winner){
                playerDescription.textContent = 'Winner : ' + winner ;
            }else{

                player = player == 'x' ? 'o' : 'x';
                playerDescription.textContent = 'Player ' + player + "'s turn";
            }
            currentSquare = squares.slice();
            history[historyIndex++] = currentSquare;
            console.log(history)

            historyMoves();

           // showHistoryMoves=document.querySelectorAll('.moves');

        }

    })
});




function convertStringToNumber(text){
    const number = numberMap[text.toLowerCase()];
    return number;
}

function historyMoves(){
    const button = document.createElement("button");
    let value = 1;
    history.map(array =>{

        button.textContent = 'move ' + value;
        button.classList.add('moves');
        button.id = value++;
        historyButtons.appendChild(button);
        button.addEventListener('click',()=>{
            const historyArray = history[value-2];
            showHistoryBoard(historyArray);
        })
    })
}

function showHistoryBoard(historyArray){
    
    let index = 0;
    buttons.forEach(button =>{
        button.textContent = historyArray[index++]
    })
}


function deleteAllHistory(){
    const elements = document.querySelectorAll('.moves')
    console.log(elements)
    elements.forEach(element => element.parentNode.removeChild(element));
}


function calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }