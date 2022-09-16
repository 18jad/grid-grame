const game = document.querySelector('.game'),
    cards = document.querySelectorAll('.card'),
    playerTurn = document.getElementById('playerTurn'),
    winningStateGrid = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ]

// game variables
let currentPlayer = 'X',
    gameRunning = true,
    gameGrid = ["", "", "", "", "", "", "", "", ""],
    winState = false;

const setCurrentPlayer = (player, modify = false) => {
    // modify currentPlayer variables if needed
    if (modify) currentPlayer = player;

    // show currentPlayer on screen
    playerTurn.textContent = `Player ${currentPlayer} turn:`;
}

setCurrentPlayer('X')

const switchPlayer = () => {
    // switch player and set currentPlayer to the one desired
    setCurrentPlayer(currentPlayer = currentPlayer == 'X' ? 'O' : 'X', true);
}

// update clickec cell and game grid
const updateCell = (clickedCell, cellIndex) => {
    // change game grid at index cell index to player play
    gameGrid[cellIndex] = currentPlayer;

    // insert x/o inside the cell
    clickedCell.textContent = currentPlayer;

    // for x and o to have different colors
    clickedCell.dataset.player = currentPlayer.toLocaleLowerCase();
}

const checkWinning = () => {
    for (let i = 0; i < gameGrid.length - 1; i++) {
        // grab indexes we want to compare from winning state grid
        // it will give us array containing 3 indexes
        let winTester = winningStateGrid[i];

        // spread those indexes into game grid to check if there's any winning pattern
        let firstCell = gameGrid[winTester[0] - 1];
        let secondCell = gameGrid[winTester[1] - 1];
        let thirdCell = gameGrid[winTester[2] - 1];

        // check winning pattern if 3 cells equal each others
        if (firstCell != '' && secondCell != '' && thirdCell != '') {
            if (firstCell == secondCell && secondCell == thirdCell) {
                // update winning state
                winState = true;

                // break out of the loop
                break;
            }
            // keep looking if no match pattern
        } else continue;
    }

    // if win state is true then game is done and player - won
    if (winState) {
        // change game state
        gameRunning = false;

        // update game status title to player won 
        playerTurn.outerHTML = `<h3 style="color: lime !important;">Player ${currentPlayer} won!<h3>`;
    } else {
        // check is game grid have any empty cell
        let check = gameGrid.includes('')

        // if yes continue the game
        // if no more empty cells then game end as draw
        if (!check) {
            gameRunning = false;
            playerTurn.outerHTML = `<h3 style="color: red !important;">DRAW!</h3>`;
        }
    }
}

// add event listener on each cell, and apply functions already made
cards.forEach((card) => {
    card.addEventListener('click', (e) => {
        // if game is not running do nothing
        if (!gameRunning) return;

        // grab clicked cell
        const clickedCard = e.target;

        // grab the index from the dataset data-index in html
        const clickedCardIndex = parseInt(clickedCard.dataset.index);

        // use already built funtions
        updateCell(clickedCard, clickedCardIndex - 1);
        checkWinning();
        switchPlayer()
    })
})