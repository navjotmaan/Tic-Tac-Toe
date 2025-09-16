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

function createPlayer(name, marker) {
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

    function checkWinner() {
        const board = Gameboard.getBoard();
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                console.log(`${currentPlayer.name} wins!`);
                gameOver = true;
                return;
            }
        }

        if (!board.includes("")) {
            console.log("It's a draw!");
            gameOver = true;
        }
    }
    
    return {
        playRound: (index) => {
            if (gameOver) return;

            Gameboard.placeMarker(index, currentPlayer.marker);
            checkWinner();

            if (!gameOver) {
                switchPlayer();
            }
        },

        resetGame: () => {
            Gameboard.resetBoard();
            currentPlayer = player1;
            gameOver = false;
        }

    }
})();

const displayController = (function () {
    const container = document.querySelector('.container');
    container.addEventListener("click", (e) => {
        let index = parseInt(e.target.id);
        gameFlow.playRound(index);
        console.log(e.target.id);
        e.target.textContent = Gameboard.getBoard()[index];
});
})();
