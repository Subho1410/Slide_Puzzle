const board = document.querySelector('#game-board');
let emptyX = 300; 
let emptyY = 300; 
let moveCount = 0;
let timeCounter = 0;
let timerInterval;

function createPiece(x, y, value) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.left = x + 'px';
    piece.style.top = y + 'px';
    piece.textContent = value;
    
    piece.addEventListener('click', () => {
        if ((Math.abs(emptyX - x) === 100 && emptyY === y) || (Math.abs(emptyY - y) === 100 && emptyX === x)) {
            piece.style.left = emptyX + 'px';
            piece.style.top = emptyY + 'px';
            emptyX = x; 
            emptyY = y;
            moveCount++;
            document.querySelector('#move-count').textContent = moveCount;
        }
        
        checkWin();
        
        function checkWin() {
            let win = true;

            for (let i=0; i<15; i++) {
                const x = (i % 4) * 100; 
                const y = Math.floor(i / 4) * 100;

                if (pieces[i].style.left !== x + 'px' || pieces[i].style.top !== y + 'px') {
                    win = false;
                    break;
                }
            }

            if (win) {
                clearInterval(timerInterval);
                alert(`You won in ${moveCount} moves and ${timeCounter} seconds!`);
            }
        }
        
        return false;
    });
    
    return piece;
}

const pieces = [];

for (let i=0; i<15; i++) {
    
    const x = (i % 4) * 100; 
    const y = Math.floor(i / 4) * 100;

    const piece = createPiece(x, y, i+1);
    pieces.push(piece);
    board.appendChild(piece);
  
}

shuffle();

function shuffle() {
for (let i=0; i<5000; i++) {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * 15);
    } while (!isValidMove(randomIndex));
    swapPieces(randomIndex);
}
}

function reset() {
for (let i=0; i<15; i++) {
    const x = (i % 4) * 100;
    const y = Math.floor(i / 4) * 100;
    pieces[i].style.left = x + 'px';
    pieces[i].style.top = y + 'px';
}
emptyX = 300;
emptyY = 300;
}
piece.addEventListener('click', () => {
if (isValidMove(i)) {
    swapPieces(i);
    checkWin();
}
});

function isValidMove(index) {
const x = parseInt(pieces[index].style.left);
const y = parseInt(pieces[index].style.top);
return (Math.abs(emptyX - x) === 100 && emptyY === y) || (Math.abs(emptyY - y) === 100 && emptyX === x);
}

function swapPieces(index) {
const x = parseInt(pieces[index].style.left);
const y = parseInt(pieces[index].style.top);
pieces[index].style.left = emptyX + 'px';
pieces[index].style.top = emptyY + 'px';
emptyX = x;
emptyY = y;
}