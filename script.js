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

const gameFlow = (function () {
    let player1, player2, currentPlayer ;
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
        startGame: (p1, p2) => {
            player1 = p1;
            player2 = p2;
            currentPlayer = player1;
            gameOver = false;
            Gameboard.resetBoard();
        },

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
    
    const gameStart = document.querySelector('#game-start');
    const gameResult = document.querySelector('#game-result');
    const container = document.querySelector('.container');
    const message = document.querySelector('.message');
    const form = document.querySelector('#player-form');
    const resetBtn = document.querySelector('#reset');
    const cells = document.querySelectorAll('.container div');
    const gameBattle = document.querySelector('#game-battle');

    let playersSet = false;

    document.addEventListener('DOMContentLoaded', () => {
         gameStart.showModal();
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        gameStart.close();

        const p1Name = document.querySelector('#player1Name').value || 'Player 1';
        const p2Name = document.querySelector('#player2Name').value || 'Player 2';

        const player1 = createPlayer(p1Name, 'X');
        const player2 = createPlayer(p2Name, 'O');

        gameFlow.startGame(player1, player2);
        playersSet = true;
        gameBattle.textContent = `Game started! ${p1Name} vs ${p2Name}`;
    });

    container.addEventListener("click", (e) => {
        if (!playersSet) return;

        if (!e.target.id) return;
        
        let index = parseInt(e.target.id);

        let result = gameFlow.playRound(index);
        e.target.textContent = Gameboard.getBoard()[index];

        if (result) {
            message.textContent = result;
            gameResult.showModal();
        }
    });

    resetBtn.addEventListener("click", () => {
        gameResult.close();
        gameFlow.resetGame();
        cells.forEach(cell => cell.textContent = "");
        message.textContent = "";

        document.querySelector('#player1Name').value = "";
        document.querySelector('#player2Name').value = "";

        playersSet = false;
        gameStart.showModal();
    });

})();
