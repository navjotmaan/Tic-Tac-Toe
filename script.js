const Gameboard = (function () {
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    return {
        placeMarker: (index, marker) => {
            if (!gameBoard[index]) {
                gameBoard[index] = marker;
            }
        },
        getBoard: () => {return gameBoard},
        resetBoard: () => {
            gameBoard = ["", "", "", "", "", "", "", "", ""];
        },
    }
})();

function createPlayer(name, marker, active) {
    return {
        name: name,
        marker: marker,
    };
}

const player1 = createPlayer('player1', 'X');
const player2 = createPlayer('player2', 'O');

const gameFlow = (function () {
    let currentPlayer = player1;
    let gameOver = false;

    function switchPlayer() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    function checkWinner() {}
    
    return {
        playRound: (index) => {
            if (gameOver) return;

            Gameboard.placeMarker(index, currentPlayer.marker);

            if (!gameOver) {
                switchPlayer();
            }
        }
    }
})();