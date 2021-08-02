'use strict';

var gQuests = [
  { id: 1, opt: ['thailand', 'india', 'peru', 'england'], correctIdx: 1 },
  { id: 2, opt: ['eygept', 'dubai', 'israel', 'napal'], correctIdx: 0 },
  { id: 3, opt: ['vietnam', 'chaina', 'iceland'], correctIdx: 1 },
  { id: 4, opt: ['barzil', 'israel', 'sout africa'], correctIdx: 0 },
];

var gCurrQuestIdx = 0;

function startGame(elButton) {
  elButton.innerHTML = 'where is this place?👆';
  renderImage(gCurrQuestIdx + 1);
  renderOptions();
}
function renderOptions() {
  var elQuestions = document.querySelector('.questions');
  var currQuest = gQuests[gCurrQuestIdx];
  var strHTML = '';

  for (var i = 0; i < currQuest.opt.length; i++) {
    strHTML += ` <div class = "questions options"  onclick="checkAnswer(${i})">${currQuest.opt[i]}</div>`;
  }
  elQuestions.innerHTML = strHTML;
}

function checkAnswer(idxOpt) {
  var elModal = document.querySelector('.modal');
  var currQuest = gQuests[gCurrQuestIdx];

  if (idxOpt === currQuest.correctIdx) {
    elModal.innerHTML = '🥸correct answer let see the next picture-👆';
    openModal();
    gCurrQuestIdx++;
    renderOptions();
    renderImage(gCurrQuestIdx + 1);
  } else {
    elModal.innerHTML = 'worng answer💩 try again';
    openModal();
  }
}

function openModal() {
  // Todo: show the modal and schedule its closing
  var elModal = document.querySelector('.modal');
  elModal.style.display = 'block';
  setTimeout(closeModal, 3000);
}

function closeModal() {
  // Todo: hide the modal
  var elModal = document.querySelector('.modal');

  elModal.style.display = 'none';
}

function renderImage(idxImage) {
  var elImg = document.querySelector('.image img');
  elImg.src = `images/${idxImage}.jpeg`;
}

function reset() {
  var elBtn = document.getElementById('reset');
  gCurrQuestIdx = 0;
  renderImage(gCurrQuestIdx + 1);
  renderOptions();
}
