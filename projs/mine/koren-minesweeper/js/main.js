'use strict';

// 1.build a board with mines/nums

// 2.show a timer starts in first click, stop when game over

// 3. CLICK:
//.left click on cell:
// a. reveals to cell content
// right click : flags/unflags a suspected cell (you cannot reveal a flagged cell)

// 4.a--LOSE: when clicking a mine, all mines should be revealed o
//4.b--WIN: all the mines are flagged, and all the other cells are shown

//6.Support 3 levels of the game
//o Beginner (4*4 with 2 MINES)
//o Medium (8 * 8 with 12 MINES)
//o Expert (12 * 12 with 30 MINES)

var gBoard;
const BOMB = '💣';
var elWatch = document.querySelector('#display');
var minutes = 0;
var hours = 0;
var seconds = 0;
var millisecound = 0;
var timer;
var gLevel = '2';
var gTime;
var gBombsLocation;
var gScore = document.getElementById('user-score');
var gLifeCount = 3;
var gSafeClickCount = 3;
var gUserStorageId = 0;
var gIsHintClicked = false;
var gHint;
var elHints = document.querySelectorAll('.hints');
var gClicksCounter;
var gManualStatus = false;
var gSafeBtn = false;
var elCountSafe = document.querySelector('.safe-clicks-count');
var gSize;
var gBestTime = [];
var gStorage = [
  {
    userId: gUserStorageId,
    name: ' puki',
    BestScore: gScore.innerHTML,
    bestTime: '0000',
    level: gLevel,
  },
];


function initGame(elLevel = 2, size = 8) {
  reset();
  gLevel = elLevel.id;
  gSize = size;
  gClicksCounter = 0;
  console.log(elLevel.id);
  gBombsLocation = [];
  gTime = 0;
  gBoard = buildBoard(size);
  console.table(gBoard);
  printMat(gBoard, '.board-container');
}

function buildBoard(matSize = 8) {
  // Create the Matrix
  var board = createMat(matSize, matSize);

  if (!gManualStatus) {
    //place the bombs in random place on the board
    renderBombs(matSize, board);
  }
  //place the number/tails on the board;
  renderNumsAfterBombs(board);

  return board;
}

function renderBombs(size, board) {
  var numOfBombs;

  if (size === 4) numOfBombs = 2;
  if (size === 8) numOfBombs = 12;
  if (size === 12) numOfBombs = 30;

  for (var i = 0; i < numOfBombs; i++) {
    var x = getRandomInt(0, size - 1);
    var y = getRandomInt(0, size - 1);
    while (board[x][y]) {
      x = getRandomInt(0, size - 1);
      y = getRandomInt(0, size - 1);
    }
    board[x][y] = BOMB;
    var location = { i: x, j: y };
    gBombsLocation.push(location);
  }
}

function validateWin(board) {
  var elCell;
  var elNumsCells;

  for (var i = 0; i < gBombsLocation.length; i++) {
    var x = gBombsLocation[i].i;
    var y = gBombsLocation[i].j;
    elCell = document.querySelector(`.cell${x}-${y}`);

    if (
      !elCell.classList.contains('marked') &&
      elCell.classList.contains('reveald')
    )
      return false;
  }

  for (var i = 0; i < board[0].length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j] === BOMB) continue;
      elNumsCells = document.querySelector(`.cell${i}-${j}`);
      if (elNumsCells.classList.contains('reveald')) continue;
      else return false;
    }
  }
  return true;
}

function numberOfNeighbors(cellI, cellJ, mat) {
  var neighborsCount = 0;

  if (mat[cellI][cellJ] === BOMB) return;
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= mat[i].length) continue;
      if (i === cellI && j === cellJ) continue;
      if (mat[i][j] === BOMB) {
        neighborsCount++;
      }
    }
  }
  return neighborsCount;
}

function revealNeighbors(cellI, cellJ, mat) {
  var elNegibhorCell;

  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= mat[i].length) continue;
      if (i === cellI && j === cellJ) continue;
      elNegibhorCell = document.querySelector(`.cell${i}-${j}`);

      elNegibhorCell.firstElementChild.removeAttribute('hidden');
      elNegibhorCell.classList.add('reveald');
      elNegibhorCell.classList.add('pressed');
    }
  }
}

function clickedCell(currCell, idxI, idxJ) {
  if (gManualStatus) {
    gBoard[idxI][idxJ] = BOMB;
    console.table(gBoard);
    var location = { i: idxI, j: idxJ };
    gBombsLocation.push(location);
    return;
  }

  var elLife;
  var elEmoji = document.querySelector('.emoji');
  var userScoreStorage;
  var userName;

  //check if this is the first cell whos clicked.
  if (!gTime) {
    gTime = 1;
    timeStart();
  }

  if (gIsHintClicked) {
    currCell.firstElementChild.removeAttribute('hidden');
    currCell.classList.remove('marked');
    currCell.classList.add('pressed');
    currCell.classList.add('reveald');
    setTimeout(() => {
      currCell.firstElementChild.hidden = true;
      currCell.classList.remove('marked');
      currCell.classList.remove('pressed');
      currCell.classList.remove('reveald');
      gIsHintClicked = false;
      gHint.style.display = 'none';
    }, 1000);
  }
  gClicksCounter++;
  console.log(gClicksCounter);
  if (isShown(idxI, idxJ)) return;

  currCell.firstElementChild.removeAttribute('hidden');
  currCell.classList.remove('marked');
  currCell.classList.add('pressed');
  currCell.classList.add('reveald');

  iswin();
  //When the player lose do:

  if (currCell.firstElementChild.innerText === BOMB) {
    if (gClicksCounter === 1) {
      setTimeout(() => {
        currCell.firstElementChild.hidden = true;
        currCell.classList.remove('marked');
        currCell.classList.remove('pressed');
        currCell.classList.remove('reveald');
      }, 1000);
      return;
    }

    //revel all the bombs and game over
    console.log('loose');
    exposeBombs();
    elEmoji.innerHTML = '🥺';
    timePaused();
    if (gLifeCount > 0) {
      console.log('game time = ' + elWatch.innerHTML);
      elWatch.innerText = 'maybe next time! try again';
      elLife = document.getElementById(`pulsingheart${gLifeCount}`);
      elLife.style.display = 'none';
      gLifeCount--;
    }
    if (gLifeCount === 0) {
      console.log(gStorage);
      elWatch.innerHTML = '☠️-you died-☠️ try again!';

      gLifeCount = 3;
      gSafeClickCount = 3;

      elHints[0].style.display = 'inline-block';
      elHints[1].style.display = 'inline-block';
      elHints[2].style.display = 'inline-block';
      elHints[0].classList.remove('hint');
      elHints[1].classList.remove('hint');
      elHints[2].classList.remove('hint');

      for (var i = 1; i <= 3; i++) {
        elLife = document.getElementById(`pulsingheart${i}`);
        elLife.style.display = 'inline-block';
      }
      setTimeout(() => {
        userName = prompt('your record will be saved, enter your name: ');
        gBestTime.sort(function (a, b) {
          return a - b;
        });
        userScoreStorage = {
          userId: gUserStorageId,
          name: userName,
          BestScore: gScore,
          bestTime: gBestTime[0],
          level: gLevel,
        };
        elCountSafe.innerHTML = `remaining clicks:${gSafeClickCount}`;
        gStorage.push(userScoreStorage);
        gScore.innerHTML = '0';
        gUserStorageId++;
      }, 2000);
    }
    setTimeout(() => {
      initGame();
    }, 3500);
  }

  if (currCell.firstElementChild.innerText !== BOMB) {
    if (numberOfNeighbors(idxI, idxJ, gBoard) === 0) {
      // revealNeighbors(idxI, idxJ, gBoard)
      //expand
      // revealNeighbors(idxI, idxJ, gBoard)
      expandNeighbors(gBoard, idxI, idxJ);
    } else if (numberOfNeighbors(idxI, idxJ, gBoard) > 0) return;
  }

  //is this a win ?
  iswin();
}

//if is win do:
function iswin() {
  if (validateWin(gBoard)) {
    var elEmoji = document.querySelector('.emoji');
    elEmoji.innerHTML = '🥳';
    var score = parseInt(gScore.innerHTML);
    if (gLevel === '1') score++;
    else if (gLevel === '2') score = score + 2;
    else if (gLevel === '3') score = score + 3;
    else score = score + 2;
    gScore.innerHTML = score.toString();
    console.log('win!!!');
    timePaused();
    var time = parseInt(elWatch.innerHTML.replaceAll(':', ''));
    gBestTime.push(time);

    elWatch.innerHTML = 'You are the winner!';
    elWatch.style.textSahdow = '2px 5px 5px black';
    elWatch.style.color = 'green';
    setTimeout(() => {
      for (var i = 0; i < gBoard[0].length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
          if (gBoard[i][j] === BOMB) {
            var elCell = document.querySelector(`.cell${i}-${j}`);
            elCell.firstElementChild.removeAttribute('hidden');
            elCell.classList.add('reveald');
            elCell.classList.add('bombed');
          }
        }
      }
    }, 1000);
    setTimeout(() => {
      initGame();
    }, 4000);
  }
}

function reset() {
  timePaused();
  var elEmoji = document.querySelector('.emoji');
  elEmoji.innerHTML = '😎';
  elWatch.style.color = 'black';
  elWatch.innerHTML = '00:00:00';
  setInterval(timer);
  millisecound = 0;
}

function handleKey(currCell, ev) {
  console.log(currCell);
  ev.preventDefault();
  if (currCell.classList.contains('marked')) {
    console.log(true);
    console.log(currCell.classList);
    currCell.classList.remove('marked');
    console.log('after remover', currCell);
    return;
  }

  if (currCell.classList.contains('reveald')) return;
  else currCell.classList.add('marked');

  if (validateWin(gBoard)) {
    timePaused();
    setTimeout(() => {
      exposeBombs();
    }, 3000);
  }
}

function exposeBombs() {
  for (var i = 0; i < gBoard[0].length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (gBoard[i][j] === BOMB) {
        var elCell = document.querySelector(`.cell${i}-${j}`);
        elCell.firstElementChild.removeAttribute('hidden');
        elCell.classList.add('reveald');
        elCell.classList.add('bombed');
      }
    }
  }
}

function timeStart() {
  elWatch.style.color = '#0f62fe';
  clearInterval(timer);
  timer = setInterval(() => {
    millisecound += 10;

    let dateTimer = new Date(millisecound);

    elWatch.innerHTML =
      ('0' + dateTimer.getUTCHours()).slice(-2) +
      ':' +
      ('0' + dateTimer.getUTCMinutes()).slice(-2) +
      ':' +
      ('0' + dateTimer.getUTCSeconds()).slice(-2) +
      ':' +
      ('0' + dateTimer.getUTCMilliseconds()).slice(-3, -1);
  }, 10);
}

function timePaused() {
  elWatch.style.color = 'red';
  clearInterval(timer);
}

//BONUS!!;

function expandNeighbors(board, idxI, idxJ) {
  if (numberOfNeighbors(idxI, idxJ, board)) return;
  for (var i = idxI - 1; i <= idxI + 1; i++) {
    for (var j = idxJ - 1; j <= idxJ + 1; j++) {
      if (!checkIfInBoard(board, i, j)) continue;
      if (!(board[i][j] === BOMB)) {
        if (isShown(i, j)) continue;
        var elCell = document.querySelector(`.cell${i}-${j}`);
        elCell.firstElementChild.removeAttribute('hidden');
        elCell.classList.add('reveald');
        elCell.classList.add('pressed');
        expandNeighbors(board, i, j);
      }
    }
  }
}

function isMarked(idxI, idxJ) {
  var elCell = document.querySelector(`.cell${idxI}-${idxJ}`);
  if (elCell.classList.contains('marked')) return true;
  return false;
}

function isShown(idxI, idxJ) {
  var elCell = document.querySelector(`.cell${idxI}-${idxJ}`);
  if (elCell.classList.contains('reveald')) return true;
  return false;
}

function checkIfInBoard(board, idxI, idxJ) {
  return (
    idxI >= 0 && idxI < board.length && idxJ >= 0 && idxJ < board[idxI].length
  );
}

function renderHint(elHint) {
  if (gClicksCounter !== 0) {
    if (elHint.classList.contains('hint')) {
      elHint.classList.remove('hint');
    }
    gHint = elHint;
    elHint.classList.add('hint');
    gIsHintClicked = true;
  }
}

function manualBomb(elBtn) {
  if (gManualStatus) {
    renderNumsAfterBombs(gBoard);
    printMat(gBoard, '.board-container');
    console.table(gBoard);
    gManualStatus = false;
    console.log(gManualStatus);
    elBtn.classList.remove('manual-warpper-clicked');
    return;
  }
  reset();
  elBtn.classList.add('manual-warpper-clicked');
  gManualStatus = true;
  gBoard = buildBoard(gSize);
  printMat(gBoard, '.board-container');
  console.table(gBoard);
  console.log(gManualStatus);
}

function activateSafeClick(elSafeBtn) {
  if (gClicksCounter) {
    var idxI;
    var idxJ;
    if (gSafeBtn) {
      gSafeBtn = false;
      console.log(gSafeBtn);
      elSafeBtn.classList.remove('safe-clicked');
      return;
    }
    elSafeBtn.classList.add('safe-clicked');
    gSafeBtn = true;

    if (gSafeClickCount !== 0) {
      //find random empty / safe cell and marked him for a few seconds

      idxI = getRandomInt(0, gBoard.length - 1);
      idxJ = getRandomInt(0, gBoard.length - 1);

      while (gBoard[idxI][idxJ] === BOMB || isShown(idxI, idxJ)) {
        idxI = randomExcluded(0, gBoard.length - 1, idxI);
        idxJ = randomExcluded(0, gBoard.length - 1, idxJ);
      }
    }

    var elSafeCell = document.querySelector(`.cell${idxI}-${idxJ}`);
    console.log('safe pos : i: ', idxI, 'j: ', idxJ);
    elSafeCell.classList.add('marked-safe');
    setTimeout(() => {
      elSafeCell.classList.remove('marked-safe');
      gSafeBtn = false;
      elSafeBtn.classList.remove('safe-clicked');
    }, 1400);
    gSafeClickCount--;
    elCountSafe.innerHTML = `remaining clicks:${gSafeClickCount}`;
  }
}

function renderNumsAfterBombs(board) {
  for (var i = 0; i < board[0].length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      var numOfNeighbors = numberOfNeighbors(i, j, board);

      switch (numOfNeighbors) {
        case 0:
          board[i][j] = '';
          break;
        case 1:
          board[i][j] = 1;
          break;
        case 2:
          board[i][j] = 2;
          break;
        case 3:
          board[i][j] = 3;
          break;
        case 4:
          board[i][j] = 4;
          break;
        case 5:
          board[i][j] = 5;
          break;
        case 6:
          board[i][j] = 6;
          break;
        case 7:
          board[i][j] = 7;
          break;
        case 8:
          board[i][j] = 8;
          break;
      }
    }
  }
}
