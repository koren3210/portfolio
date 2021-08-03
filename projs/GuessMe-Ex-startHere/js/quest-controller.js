'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);
$('.modal button').click(onCloseModal)


function init() {
  console.log('Started...');
  createQuestsTree();
}

function onStartGuessing() {
  // TODO: hide the game-start section
  $('.game-start').hide();
  renderQuest();
  $('.quest').show()
  // TODO: show the quest section
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
  var currQuest = getCurrQuest()
  console.log(currQuest);
  $('.quest h2').html(currQuest.txt);
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('.modal').show()
      $('.modal p').text('Yes, I knew it!')
      // TODO: improve UX
    } else {
      $('.modal').show()
      $('.modal p').text('I dont know...teach me!')
      $('.new-quest').show()
      $('.quest').hide();
      // TODO: hide and show new-quest section
    }
  } else {
    gLastRes = res
    // TODO: update the lastRes global var
    moveToNextQuest(res);
    renderQuest();
  }
}

function onCloseModal() {
  $('.modal').hide()
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();

  // TODO: Get the inputs' values
  // TODO: Call the service addGuess
  addGuess(newGuess, newQuest, gLastRes)

  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show();
  gLastRes = null;
}
