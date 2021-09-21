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

//*functions__________________________________________________________________

const currPlayerHasWon = function () {
    if (cellVal[0] === currPlayer) {
        if (cellVal[1] === currPlayer && cellVal[2] === currPlayer) {
            console.log(`${currPlayer} wins up top!!`);

            cellDivs[0].classList.add("won");
            cellDivs[1].classList.add("won");
            cellDivs[2].classList.add("won");

            winner = currPlayer;
            return true;
        }

        if (cellVal[3] === currPlayer && cellVal[6] === currPlayer) {
            console.log(`${currPlayer} wins up left column!!`);

            cellDivs[0].classList.add("won");
            cellDivs[3].classList.add("won");
            cellDivs[6].classList.add("won");

            winner = currPlayer;

            return true;
        }

        if (cellVal[4] === currPlayer && cellVal[8] === currPlayer) {
            console.log(`${currPlayer} wins up principal diagonal!!`);

            cellDivs[0].classList.add("won");
            cellDivs[4].classList.add("won");
            cellDivs[8].classList.add("won");

            winner = currPlayer;

            return true;
        }
    }

    if (cellVal[8] === currPlayer) {
        if (cellVal[6] === currPlayer && cellVal[7] === currPlayer) {
            console.log(`${currPlayer} wins up bottom!!`);

            cellDivs[8].classList.add("won");
            cellDivs[6].classList.add("won");
            cellDivs[7].classList.add("won");

            winner = currPlayer;

            return true;
        }

        if (cellVal[2] === currPlayer && cellVal[5] === currPlayer) {
            console.log(`${currPlayer} wins up right column!!`);

            cellDivs[8].classList.add("won");
            cellDivs[2].classList.add("won");
            cellDivs[5].classList.add("won");

            winner = currPlayer;

            return true;
        }
    }

    if (cellVal[4] === currPlayer) {
        if (cellVal[3] === currPlayer && cellVal[5] === currPlayer) {
            console.log(`${currPlayer} wins up middle row!!`);

            cellDivs[4].classList.add("won");
            cellDivs[3].classList.add("won");
            cellDivs[5].classList.add("won");

            winner = currPlayer;

            return true;
        }

        if (cellVal[1] === currPlayer && cellVal[7] === currPlayer) {
            console.log(`${currPlayer} wins up middle column!!`);

            cellDivs[4].classList.add("won");
            cellDivs[1].classList.add("won");
            cellDivs[7].classList.add("won");

            winner = currPlayer;

            return true;
        }

        if (cellVal[2] === currPlayer && cellVal[6] === currPlayer) {
            console.log(`${currPlayer} wins up non principal diagonal!!`);

            cellDivs[4].classList.add("won");
            cellDivs[2].classList.add("won");
            cellDivs[6].classList.add("won");

            winner = currPlayer;

            return true;
        }
    }

    return false;
};

const gameDrawn = function () {
    for (let i = 0; i < cellVal.length; i++)
        if (cellVal[i] === null) {
            console.log("cellVal[", i, "] = null");
            return false;
        }

    console.log("game drawn!!!");

    winner = "D";

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
//*event handlers___________________________________________________________

const handleRestart = function (event) {
    console.log("restart clicked");

    gameIsLive = true;
    currPlayer = firstPlayer;
    winner = null;
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
    console.log(`cell ${id} clicked`);

    const classList = event.target.classList;

    if (!classList.contains("X") && !classList.contains("O") && gameIsLive) {
        classList.add(currPlayer);
        cellVal[i] = currPlayer;

        if (currPlayerHasWon()) {
            // statusDiv.innerText = `${winner} has won !!!!`;
            // gameIsLive = false;

            endGame();
            return;
        } else if (gameDrawn()) {
            // statusDiv.innerText = `Match ended in a tie !!!!`;
            // gameIsLive = false;

            endGame();
            return;
        }

        currPlayer = currPlayer === "X" ? "O" : "X";
        statusDiv.innerText = `${currPlayer}'s turn `;
    }
};

const handleCellHover = function (event) {
    const id = event.target.id;
    const i = Number(id);

    console.log(`cell ${id} hovered`);

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
    console.log(cellDivs[i]);

    cellDivs[i].addEventListener("click", handleCellClick);
    cellDivs[i].addEventListener("mouseover", handleCellHover);
}
