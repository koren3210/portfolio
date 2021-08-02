'use stirct'

var gNums1 = '';
var gNums2 = null;
var gOp;
var elOutput = document.getElementById("result")
var gMermoryNum;
var gBase = 10;


function addDigit(elDigit) {

  var digitVal = elDigit.value
  console.log('digit val', digitVal);

  if (digitVal === '.') {
    elOutput.value += '.'
  }
  if (gNums2 == null) {
    gNums1 += (digitVal)
    elOutput.value = gNums1

  }
  else {
    gNums2 += (digitVal)
    elOutput.value = gNums2
  }
  gMermoryNum = gNums2
  console.log('mermory : ', gMermoryNum);
  console.log('gNums1', gNums1);
  console.log('gNums2', gNums2)

}

function mermoryCall() {
  elOutput.value = gMermoryNum
  gNums2 = elOutput.value
}

function clearMermory() {
  gNums1 = '';
  gNums2 = null;

  elOutput.value = '0';
  console.log(elOutput.value);

}

function clearMc() {
  gMermoryNum = 0;
}

function storeMS() {
  gMermoryNum = elOutput.value;
  console.log('stored num', gMermoryNum);
}

function pluseM() {
  var currRes = elOutput.value;

  var floatMermory = parseFloat(gMermoryNum);
  var floatRes = parseFloat(currRes);

  floatMermory += floatRes;

  gMermoryNum = floatMermory.toString()


  console.log('the displayed num + the current mermory : ', gMermoryNum);
  console.log('type : ', typeof gMermoryNum);
}

function setOp(elOp) {

  if (gNums2 !== null && elOp.value !== '%' && gNums2 !== '') {

    printResult()
    gMermoryNum = gNums2;
  }

  gOp = elOp.value;

  console.log(gOp);
  console.log(typeof gOp);
  gNums2 = ''

}

function printResult() {
  if (gNums2 == null) elOutput.value = gNums1
  else {
    gNums1 = parseFloat(gNums1)
    gNums2 = parseFloat(gNums2)

    console.log(gNums1.toString(gBase));
    console.log(gNums2.toString(gBase))


    var result;
    switch (gOp) {
      case "+":
        result = gNums1 + gNums2
        break;
      case "-":
        result = gNums1 - gNums2
        break;
      case "/":
        result = gNums1 / gNums2
        break;
      case "*":
        result = gNums1 * gNums2
        break;
      case "%":
        result = gNums1 % gNums2
        break;
      case "√":
        result = Math.sqrt(parseFloat(elOutput.value))
        break;
      default: result = 0;
    }

    var changedBase = result.toString(gBase);


    elOutput.value = changedBase.toString()
    gNums1 = result
    gNums2 = '';

  }
}

function chooseBase(elBase) {


  switch (elBase.value) {
    case "2":
      gBase = 2;
      setTimeout(closeModal(), 5000)
      break;
    case "10":
      gBase = 10;
      setTimeout(closeModal(), 5000)
      break;
    case "16":
      gBase = 16;
      setTimeout(closeModal(), 5000)
      break;
    case "8":
      gBase = 10;
      setTimeout(closeModal(), 5000)
      break;
    default: gBase = 10;
  }
}

function deleteNum() {

  var length = elOutput.value.length;
  console.log(elOutput.value.length);
  var newOp = elOutput.value.substring(0, length - 1)

  elOutput.value = newOp
  gNums2 = parseFloat(newOp)


}

function openModal() {
  // Todo: show the modal and schedule its closing
  var elModal = document.querySelector('.modal');
  elModal.style.display = 'block';
  setTimeout(closeModal, 18000);
}

function closeModal() {
  // Todo: hide the modal
  var elModal = document.querySelector('.modal');
  elModal.style.display = 'none';

}


