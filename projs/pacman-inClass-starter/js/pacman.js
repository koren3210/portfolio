'use strict'
const PACMAN = '😷';


var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 6
        },
        isSuper: false

    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}


function powerdMode() {

    gPacman.isSuper = true;
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].img = MONSTER
        // gGhosts[i].type = "monster"
    }
}

function outPowerdMode() {
    gPacman.isSuper = false;
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        ghost.img = gGhostsImg[i]
        // gGhosts[i].type = "normal"
    }
    console.log(gGhosts)

}

function movePacman(ev) {

    if (!gGame.isOn) return
    // use getNextLocation(), nextCell
    // console.log('gPacman.location', gPacman.location);
    var nextLocation = getNextLocation(ev);
    if (!nextLocation) return
    // console.log('nextLocation', nextLocation);
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    console.log(nextCell);
    // return if cannot move
    if (nextCell === WALL) return
    // hitting a ghost?  call gameOver

    if (gGhostsImg.includes(nextCell)  && nextCell !== MONSTER ) {
        var modalStr = "Game over!!! play again!👇"
        gameOver(modalStr)
    }
    if (gPacman.isSuper) {
        if (nextCell = MONSTER) gGhosts.splice(nextCell.img, 1)
        console.log(nextCell);
    }
    if (gGame.score > gFoodCounter) {
        var modalStr = "vicrory!!! play again!👇"
        gameOver(modalStr)
    }

    if (nextCell === FOOD) updateScore(1);

    if (nextCell === POWER_FOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true;
        setTimeout(() => {
            gPacman.isSuper = false;
        }, 5000);
    }

    if (nextCell === CHERRY) {
        updateScore(10)
    }



    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the DOM
    renderCell(gPacman.location, EMPTY);
    // Move the pacman
    // update the model
    gPacman.location = nextLocation;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the DOM
    renderCell(gPacman.location, PACMAN);

}



function getNextLocation(eventKeyboard) {
    // console.log('eventKeyboard', eventKeyboard)
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // figure out nextLocation
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;

        default: return null
    }
    return nextLocation;
}

function killMonster(nextCell) {
    console.log(nextCell);
    if (nextCell === MONSTER) {
        gGhosts.splice(nextCell.idx, 1)
        nextCell = EMPTY;
        renderCell(nextCell, nextCell.currCellContent);
    }
}