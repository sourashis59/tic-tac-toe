//HTML Elements

const statusDiv = document.querySelector(".status");
const restartDiv = document.querySelector(".restartButton");
const cellDivs = document.querySelectorAll(".game-cell");

// console.log(restartDiv) ;

//*Game variables ____________________________________________________

const firstStatusDiv = statusDiv.innerText;
let xSymbol = "✖";
let oSymbol = "O";

let gameIsLive = true;
let firstPlayer = "X";
let currPlayer = firstPlayer;
// let xIsNext = true;

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

            return true;
        }

        if (cellVal[3] === currPlayer && cellVal[6] === currPlayer) {
            console.log(`${currPlayer} wins up left column!!`);

            cellDivs[0].classList.add("won");
            cellDivs[3].classList.add("won");
            cellDivs[6].classList.add("won");

            return true;
        }

        if (cellVal[4] === currPlayer && cellVal[8] === currPlayer) {
            console.log(`${currPlayer} wins up principal diagonal!!`);

            cellDivs[0].classList.add("won");
            cellDivs[4].classList.add("won");
            cellDivs[8].classList.add("won");

            return true;
        }
    }

    if (cellVal[8] === currPlayer) {
        if (cellVal[6] === currPlayer && cellVal[7] === currPlayer) {
            console.log(`${currPlayer} wins up bottom!!`);

            cellDivs[8].classList.add("won");
            cellDivs[6].classList.add("won");
            cellDivs[7].classList.add("won");

            return true;
        }

        if (cellVal[2] === currPlayer && cellVal[5] === currPlayer) {
            console.log(`${currPlayer} wins up right column!!`);

            cellDivs[8].classList.add("won");
            cellDivs[2].classList.add("won");
            cellDivs[5].classList.add("won");

            return true;
        }
    }

    if (cellVal[4] === currPlayer) {
        if (cellVal[3] === currPlayer && cellVal[5] === currPlayer) {
            console.log(`${currPlayer} wins up middle row!!`);

            cellDivs[4].classList.add("won");
            cellDivs[3].classList.add("won");
            cellDivs[5].classList.add("won");

            return true;
        }

        if (cellVal[1] === currPlayer && cellVal[7] === currPlayer) {
            console.log(`${currPlayer} wins up middle column!!`);

            cellDivs[4].classList.add("won");
            cellDivs[1].classList.add("won");
            cellDivs[7].classList.add("won");

            return true;
        }

        if (cellVal[2] === currPlayer && cellVal[6] === currPlayer) {
            console.log(`${currPlayer} wins up non principal diagonal!!`);

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
            console.log("cellVal[", i, "] = null");
            return false;
        }

    console.log("game drawn!!!");
    return true;
};

//*event handlers___________________________________________________________

const handleRestart = function (event) {
    console.log("restart clicked");

    //TODO:

    gameIsLive = true;
    currPlayer = firstPlayer;
    statusDiv.innerText = firstStatusDiv;

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
            statusDiv.innerText = `${currPlayer} has won !!!!`;
            gameIsLive = false;
            return;
        } else if (gameDrawn()) {
            statusDiv.innerText = `Match ended in a tie !!!!`;
            gameIsLive = false;
            return;
        }

        // xIsNext = !xIsNext;
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

//*event listners_______________________________________________________________
restartDiv.addEventListener("click", handleRestart);

for (let i = 0; i < cellDivs.length; i++) {
    console.log(cellDivs[i]);

    cellDivs[i].addEventListener("click", handleCellClick);
    cellDivs[i].addEventListener("mouseover", handleCellHover);
}
