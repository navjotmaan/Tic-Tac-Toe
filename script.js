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
        active: active,
    };
}

const player1 = createPlayer('player1', 'X', "");
const player2 = createPlayer('player2', 'O', "");

const gameFlow = {};