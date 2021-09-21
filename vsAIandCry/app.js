"use strict";

//HTML Elements

const statusDiv = document.querySelector(".status");
const restartDiv = document.querySelector(".restartButton");
const cellDivs = document.querySelectorAll(".game-cell");
const endGameContainer = document.querySelector(".endgame-container");
const endGameMessage = document.querySelector(".endgame-message");
const overlayDiv = document.querySelector(".overlay");
const closeModalButton = document.querySelector(".close-modal");

// console.log(restartDiv) ;

//*Game variables ____________________________________________________

const firstStatusDiv = statusDiv.innerText;
let xSymbol = "✖";
let oSymbol = "O";

let gameIsLive = true;
let firstPlayer = "X";
let currPlayer = firstPlayer;
let winner = null; // 'X' means winner is 'X' , 'O' means winner is 'O', 'D' means draw, and nulls means result is not decided yet

//indicates the values at cell[i]
let cellVal = [null, null, null, null, null, null, null, null, null];

let humanMove = true;

//*functions__________________________________________________________________

const currPlayerHasWon = function (currPlayer, cellVal) {
    if (cellVal[0] === currPlayer) {
        if (cellVal[1] === currPlayer && cellVal[2] === currPlayer) {
            // console.log(`${currPlayer} wins up top!!`);

            cellDivs[0].classList.add("won");
            cellDivs[1].classList.add("won");
            cellDivs[2].classList.add("won");

            return true;
        }

        if (cellVal[3] === currPlayer && cellVal[6] === currPlayer) {
            // console.log(`${currPlayer} wins up left column!!`);

            cellDivs[0].classList.add("won");
            cellDivs[3].classList.add("won");
            cellDivs[6].classList.add("won");

            return true;
        }

        if (cellVal[4] === currPlayer && cellVal[8] === currPlayer) {
            // console.log(`${currPlayer} wins up principal diagonal!!`);

            cellDivs[0].classList.add("won");
            cellDivs[4].classList.add("won");
            cellDivs[8].classList.add("won");

            return true;
        }
    }

    if (cellVal[8] === currPlayer) {
        if (cellVal[6] === currPlayer && cellVal[7] === currPlayer) {
            // console.log(`${currPlayer} wins up bottom!!`);

            cellDivs[8].classList.add("won");
            cellDivs[6].classList.add("won");
            cellDivs[7].classList.add("won");

            return true;
        }

        if (cellVal[2] === currPlayer && cellVal[5] === currPlayer) {
            // console.log(`${currPlayer} wins up right column!!`);

            cellDivs[8].classList.add("won");
            cellDivs[2].classList.add("won");
            cellDivs[5].classList.add("won");

            return true;
        }
    }

    if (cellVal[4] === currPlayer) {
        if (cellVal[3] === currPlayer && cellVal[5] === currPlayer) {
            // console.log(`${currPlayer} wins up middle row!!`);

            cellDivs[4].classList.add("won");
            cellDivs[3].classList.add("won");
            cellDivs[5].classList.add("won");

            return true;
        }

        if (cellVal[1] === currPlayer && cellVal[7] === currPlayer) {
            // console.log(`${currPlayer} wins up middle column!!`);

            cellDivs[4].classList.add("won");
            cellDivs[1].classList.add("won");
            cellDivs[7].classList.add("won");

            return true;
        }

        if (cellVal[2] === currPlayer && cellVal[6] === currPlayer) {
            // console.log(`${currPlayer} wins up non principal diagonal!!`);

            cellDivs[4].classList.add("won");
            cellDivs[2].classList.add("won");
            cellDivs[6].classList.add("won");

            return true;
        }
    }

    return false;
};

const gameDrawn = function () {
    for (let i = 0; i < cellVal.length; i++)
        if (cellVal[i] === null) {
            // console.log("cellVal[", i, "] = null");
            return false;
        }

    // console.log("game drawn!!!");

    return true;
};

const endGame = function () {
    if (winner !== null) {
        gameIsLive = false;

        if (winner === "D") {
            statusDiv.innerText = `Match ended in tie!!!`;
            endGameMessage.innerText = `Match ended in a tie!!!`;
        } else {
            statusDiv.innerText = `${winner} has won !!!!`;

            endGameMessage.innerText = `${winner} has won !!!!`;
        }

        endGameContainer.classList.remove("hidden");
        overlayDiv.classList.remove("hidden");
    }
};

//returns the possible moves(i.e, the empty cell indices) of current position,
const possibleMoves = function (currPosition) {
    let moves = [];
    for (let i = 0; i < currPosition.length; i++) {
        if (currPosition[i] === null) moves.push(i);
    }

    return moves;
};

//Returns +10, if "X" wins
//        -10, if "O" wins
//         0, if the current position is draw
//         "unknow", otherwise
const getStaticEvalution = function (currPosition) {
    if (currPosition[0]) {
        if (
            currPosition[0] === currPosition[1] &&
            currPosition[1] === currPosition[2]
        ) {
            // console.log(`${currPlayer} wins up top!!`);

            return currPosition[0] === "X" ? 10 : -10;
        }

        if (
            currPosition[3] === currPosition[6] &&
            currPosition[6] === currPosition[0]
        ) {
            // console.log(`${currPlayer} wins up left column!!`);

            return currPosition[0] === "X" ? 10 : -10;
        }

        if (
            currPosition[4] === currPosition[8] &&
            currPosition[8] === currPosition[0]
        ) {
            // console.log(`${currPlayer} wins up principal diagonal!!`);

            return currPosition[0] === "X" ? 10 : -10;
        }
    }

    if (currPosition[8]) {
        if (
            currPosition[6] === currPosition[7] &&
            currPosition[7] === currPosition[8]
        ) {
            // console.log(`${currPlayer} wins up bottom!!`);

            return currPosition[8] === "X" ? 10 : -10;
        }

        if (
            currPosition[2] === currPosition[5] &&
            currPosition[5] === currPosition[8]
        ) {
            // console.log(`${currPlayer} wins up right column!!`);
            return currPosition[8] === "X" ? 10 : -10;
        }
    }

    if (currPosition[4]) {
        if (
            currPosition[5] === currPosition[4] &&
            currPosition[3] === currPosition[5]
        ) {
            // console.log(`${currPlayer} wins up middle row!!`);

            return currPosition[4] === "X" ? 10 : -10;
        }

        if (
            currPosition[1] === currPosition[7] &&
            currPosition[7] === currPosition[4]
        ) {
            // console.log(`${currPlayer} wins up middle column!!`);

            return currPosition[4] === "X" ? 10 : -10;
        }

        if (
            currPosition[2] === currPosition[6] &&
            currPosition[6] === currPosition[4]
        ) {
            // console.log(`${currPlayer} wins up non principal diagonal!!`);

            return currPosition[4] === "X" ? 10 : -10;
        }
    }

    //check if draw or not
    for (let i = 0; i < currPosition.length; i++) {
        if (currPosition[i] === null) return "unknow";
    }

    return 0;
};

//*IMPORTANT: minimax algorithm

//pass the current position and current player , and minimax() will return {bext move, score}
// if currPlayer === winner , then returns +10
// if currPlayer === loser , then returns -10
// if match is tie , then returns 0
//And I am assuming "X" is the maximizer player and "O" is the minimizer player
//that is, if "X" wins, then evaluation of the board = +10
//      and, if "O" wins, then evaluation of the board = -10
//     and , on tie, evaluation of the board = 0

const minimax = function (currPlayer_argument, currPosition) {
    let currPlayer = currPlayer_argument.slice(0);
    let newBoard = [...currPosition];
    // console.log(newBoard);

    let possibleMovesList = possibleMoves(newBoard);

    // console.log(
    //     `Inside minimax: currPlayer: ${currPlayer}, board : ${newBoard} , possible moves: ${possibleMovesList}`
    // );

    // debugger;

    let staticEvalution = getStaticEvalution(newBoard);

    if (staticEvalution !== "unknow")
        if (staticEvalution === 10) {
            // console.log("player X won");
            return { bestMove: -1, score: 10 };
        } else if (staticEvalution === -10) {
            // console.log("player O won");
            return { bestMove: -1, score: -10 };
        } else if (staticEvalution === 0) {
            // console.log("Draw");
            return { bestMove: -1, score: 0 };
        }
    let moves = [];

    //find the evaluations for all possible moves
    for (let i = 0; i < possibleMovesList.length; i++) {
        let currMove = { move: -1, score: 0 };
        currMove.move = possibleMovesList[i];

        newBoard[possibleMovesList[i]] = currPlayer;

        if (currPlayer === "X") {
            let result = minimax("O", newBoard);
            currMove.score = result.score;
        } else {
            let result = minimax("X", newBoard);
            currMove.score = result.score;
        }

        moves.push(currMove);

        //reverse the current move from board
        newBoard[possibleMovesList[i]] = null;
    }

    // console.log(`Moves : ${moves[0].move}, ${moves[0].score} `);
    let bestMove = -1;
    let bestScore = 0;

    //for maximizing player
    if (currPlayer === "X") {
        bestScore = -10;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = moves[i].move;
            }
        }
    }
    //for minimizing player
    else {
        bestScore = +10;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = moves[i].move;
            }
        }
    }

    // console.log(`Best move: ${bestMove}   `);

    return { move: bestMove, score: bestScore };
};

const getBestMove = function (currPlayer, currPosition) {
    return minimax(currPlayer, currPosition);
};

const giveMoveFromAI = function () {
    const bestMove = getBestMove(currPlayer, cellVal);
    let i = bestMove.move;
    if (i != -1) {
        cellDivs[i].classList.add(currPlayer);
        cellVal[i] = currPlayer;

        if (currPlayerHasWon(currPlayer, cellVal)) {
            // statusDiv.innerText = `${winner} has won !!!!`;
            gameIsLive = false;

            winner = currPlayer;

            endGame();
        } else if (gameDrawn(cellVal)) {
            // statusDiv.innerText = `Match ended in a tie !!!!`;
            gameIsLive = false;

            winner = "D";

            endGame();
        } else {
            currPlayer = currPlayer === "X" ? "O" : "X";
            humanMove = true;
            statusDiv.innerText = `${currPlayer}'s turn `;
        }
    }
};

//*event handlers___________________________________________________________

const handleRestart = function (event) {
    // console.log("restart clicked");

    gameIsLive = true;
    currPlayer = firstPlayer;
    winner = null;
    humanMove = true;
    statusDiv.innerText = firstStatusDiv;

    endGameContainer.classList.add("hidden");
    overlayDiv.classList.add("hidden");

    for (let i = 0; i < cellDivs.length; i++) {
        cellVal[i] = null;
        cellDivs[i].classList.remove("X");
        cellDivs[i].classList.remove("O");
        cellDivs[i].classList.remove("won");
    }
};

const handleCellClick = function (event) {
    let id = event.target.id;
    let i = Number(id);
    // console.log(`cell ${id} clicked`);

    const classList = event.target.classList;

    if (
        !classList.contains("X") &&
        !classList.contains("O") &&
        gameIsLive &&
        humanMove
    ) {
        classList.add(currPlayer);
        cellVal[i] = currPlayer;

        if (currPlayerHasWon(currPlayer, cellVal)) {
            // statusDiv.innerText = `${winner} has won !!!!`;
            gameIsLive = false;

            winner = currPlayer;

            endGame();
            return;
        } else if (gameDrawn(cellVal)) {
            // statusDiv.innerText = `Match ended in a tie !!!!`;
            gameIsLive = false;

            winner = "D";

            endGame();
            return;
        }

        currPlayer = currPlayer === "X" ? "O" : "X";
        humanMove = false;
        statusDiv.innerText = `${currPlayer}'s turn `;

        giveMoveFromAI();
    }
};

const handleCellHover = function (event) {
    const id = event.target.id;
    const i = Number(id);

    // console.log(`cell ${id} hovered`);

    if (cellVal[i] !== null || !gameIsLive)
        event.target.style.cursor = "not-allowed";
    else {
        event.target.style.cursor = "pointer";

        //TODO: Add hover effect of unused box
    }
};

const handleCloseModal = function () {
    endGameContainer.classList.add("hidden");
    overlayDiv.classList.add("hidden");
};

//*event listners_______________________________________________________________

restartDiv.addEventListener("click", handleRestart);
closeModalButton.addEventListener("click", handleCloseModal);
overlayDiv.addEventListener("click", handleCloseModal);
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") handleCloseModal();
});

//*Execution__________________________________________________________________________
for (let i = 0; i < cellDivs.length; i++) {
    // console.log(cellDivs[i]);

    cellDivs[i].addEventListener("click", handleCellClick);
    cellDivs[i].addEventListener("mouseover", handleCellHover);
}

// while (/*gameIsLive*/ 1) {
//     if (!humanMove && gameIsLive) {
//         const bestMove = getBestMove(currPlayer, cellVal);
//         let i = bestMove.move;
//         if (i != -1) {
//             cellDivs[i].classList.add(currPlayer);
//             cellVal[i] = currPlayer;

//             if (currPlayerHasWon(currPlayer, cellVal)) {
//                 // statusDiv.innerText = `${winner} has won !!!!`;
//                 gameIsLive = false;

//                 winner = currPlayer;

//                 endGame();
//             } else if (gameDrawn(cellVal)) {
//                 // statusDiv.innerText = `Match ended in a tie !!!!`;
//                 gameIsLive = false;

//                 winner = "D";

//                 endGame();
//             } else {
//                 currPlayer = currPlayer === "X" ? "O" : "X";
//                 humanMove = true;
//                 statusDiv.innerText = `${currPlayer}'s turn `;
//             }
//         }
//     }
// }
