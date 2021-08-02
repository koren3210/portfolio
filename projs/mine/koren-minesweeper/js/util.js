'use strict'

//!!---utils--- !!

function createMat(ROWS, COLS) {
  var mat = []
  for (var i = 0; i < ROWS; i++) {
    var row = []
    for (var j = 0; j < COLS; j++) {
      row.push('')
    }
    mat.push(row)
  }
  return mat
}

/**
* Returns a random number between min (inclusive) and max (exclusive)
*/
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
* Returns a random integer between min (inclusive) and max (inclusive).
* The value is no lower than min (or the next integer greater than min
* if min isn't an integer) and no greater than max (or the next integer
* lower than max if max isn't an integer).
* Using Math.round() will give you a non-uniform distribution!
*/
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function printMat(mat, selector) {

  var strHTML = '<table border="1" cellPadding="10"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className + `"oncontextmenu="handleKey(this, event)" onclick="clickedCell(this, ${i},${j})"> <p hidden>` + cell + '</p> </td>'
      //<p hidden>' + cell + '</p>  //important!!! 
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}


function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}
function randomExcluded(min, max, excluded) {
  var n = Math.floor(Math.random() * (max - min) + min);
  if (n >= excluded) n++;
  return n;
}

function openModal() {

  // Todo: show the modal and schedule its closing
  var bestRec = findBestRecord(gStorage)
  var elModal = document.querySelector('.modal');
  var strModal = `
   BEST RECORD: <br>

  best record time= ${bestRec.bestTime}   <br>

  best record score: ${bestRec.bestScore}   <br>

  ${gStorage[gStorage.length - 1].name}'s record Time  = ${"best time = ", gStorage[gStorage.length - 1].bestTime}   <br>

  
  ${gStorage[gStorage.length - 1].name}'s record  Score = ${"best score = ", gStorage[gStorage.length - 1].bestScore}   <br>

  level: ${gLevel}
  `
  elModal.firstElementChild.innerHTML = strModal
  elModal.style.display = 'block';
  setTimeout(closeModal, 7000);
}

function closeModal() {
  // Todo: hide the modal
  var elModal = document.querySelector('.modal');
  elModal.style.display = 'none';

}

function findBestRecord(gStorage) {
  var timeRecord = []
  var scoreRecord = []
  for (var i = 0; i < gStorage.length; i++) {
    timeRecord.push(gStorage[i].bestTime)
    scoreRecord.push((parseInt(gStorage[i].BestScore.innerHTML)))
  }
  timeRecord.sort((a, b) => a - b);
  scoreRecord.sort((a, b) => a - b);

  var object = {
    bestTime: timeRecord[timeRecord.length - 1], bestScore: scoreRecord[scoreRecord.length - 1]
  }
  return object
}