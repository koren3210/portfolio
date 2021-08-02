'use strict'

var gGhosts;
var gIntervalGhosts;
var gGhostsImg = createGhostsImg(4);
var gGhostIdx = 0;


function createGhostsImg(numOfGhosts) {
    var gohstImages = [];
    for (var i = 0; i < numOfGhosts; i++) {
        var img = `<img src="css/img/${i + 1}.png"/>`;
        gohstImages.push(img)
    }
    return gohstImages
}


function createGhost(board, ghostImg, idx) {

    var ghost = {
        location: {
            i: 3,
            j: 3,
        },
        img: ghostImg,
        index: idx,
        currCellContent: FOOD
    }

    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = ghost.img;

}

function createGhosts(board) {

    var rndNum;

    // 3 ghosts and an interval
    gGhosts = [];

    for (var i = 0; i < 4; i++) {
        rndNum = getRandomIntInclusive(0, 3);
        createGhost(board, gGhostsImg[rndNum], i)
    }

    gIntervalGhosts = setInterval(moveGhosts, 1500)

}

function moveGhosts() {
    // loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost);
    }
}


function moveGhost(ghost) {

    // figure out moveDiff, nextLocation, nextCell

    var moveDiff = getMoveDiff()

    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    // console.log('nextLocation', nextLocation);
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell', nextCell);
    // return if cannot move


    if (nextCell === WALL) return
    // if (gGhostsImg.includes(nextCell)) return
    // hitting a pacman?  call gameOver

    if (gGhostsImg.includes(nextCell)) return

    if (nextCell === PACMAN) {
        if (gPacman.isSuper) return
        var modalStr = "gameOver!!! play again!👇"
        gameOver(modalStr)
    }




    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent);
    // Move the ghost
    // update the model
    ghost.location = nextLocation;
    ghost.currCellContent = nextCell;

    gBoard[ghost.location.i][ghost.location.j] = ghost.img
    // update the DOM
    console.log(getGhostHTML(ghost));
    renderCell(ghost.location, getGhostHTML(ghost));
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    return (gPacman.isSuper) ? `<span>${MONSTER}</span>` : `<span>${ghost.img}</span>`
}