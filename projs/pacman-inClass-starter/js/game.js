'use strict'

const WALL = '🟪'
const FOOD = '💰'
const EMPTY = ' ';
const POWER_FOOD = '🍌';
const MONSTER = `<img src="css/img/s.png">`
const CHERRY = `<img src="css/img/c.png">`;


var gCherryIntervalId;




var gFoodCounter = 0;
var gWallCount = 0;

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    closeModal()
    console.log('hello')
    gFoodCounter = 0;
    gGame.score = 0;
    gWallCount = 0
    document.querySelector('h2 span').innerText = gGame.score;
    gCherryIntervalId = setInterval(addCherry, 15000)
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gWallCount++
            }
        }

    }
    board[1][8] = POWER_FOOD;
    board[8][8] = POWER_FOOD;
    board[8][1] = POWER_FOOD;
    board[1][1] = POWER_FOOD;
    gFoodCounter = SIZE * SIZE - gWallCount - 4
    console.log(gFoodCounter);
    console.table(board)
    return board;
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver(strModal) {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    gFoodCounter = 0;
    gGame.score = 0;
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    var modalStr = strModal;
    openModal(modalStr)
    renderCell(gPacman.location, EMPTY);

}

function addCherry() {
    var randEmptyLoc = getRandomEmptyCellLoc();
    if (!randEmptyLoc) return;
    gBoard[randEmptyLoc.i][randEmptyLoc.j] = CHERRY;
    renderCell(randEmptyLoc, CHERRY);
}


function getRandomEmptyCellLoc() {
    var randEmptyCellLoc;
    var emptyCellsLoc = getEmptyCells(gBoard);
    var randIdx = getRandomIntInclusive(0, emptyCellsLoc.length);
    randEmptyCellLoc = emptyCellsLoc.length > 0 ? emptyCellsLoc[randIdx] : null;
    return randEmptyCellLoc;
}

function getEmptyCells(board) {
    var emptyCellsLoc = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] === EMPTY) emptyCellsLoc.push({ i, j })
        }
    }
    return emptyCellsLoc;
}



