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

const player1 = createPlayer('player X', 'X');
const player2 = createPlayer('player O', 'O');

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
                gameOver = true;
                return `${currentPlayer.name} wins!`;
            }
        }

        if (!board.includes("")) {
            gameOver = true;
            return "It's a draw!";
        }
        return null;
    }
    
    return {
        playRound: (index) => {
            if (gameOver) return;

            Gameboard.placeMarker(index, currentPlayer.marker);
            let result = checkWinner();

            if (!gameOver) {
                switchPlayer();
            }
            return result;
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
    const message = document.querySelector('.message');

    container.addEventListener("click", (e) => {
        let index = parseInt(e.target.id);
        let result = gameFlow.playRound(index);
        e.target.textContent = Gameboard.getBoard()[index];

        if (result) {
            message.textContent = result;
        }
});

    const resetBtn = document.querySelector('#reset');
    const cells = document.querySelectorAll('.container div');
    resetBtn.addEventListener("click", () => {
        gameFlow.resetGame();
        cells.forEach(cell => cell.textContent = "");
    });
})();
