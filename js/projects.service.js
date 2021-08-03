'use strict'

var gProjs;
var gContacts = [];
const KEY = 'porjDB'
const CONTACT = 'contactDB'

_createProjs()


function _createProj(id, name, title, desc, url, publishedAt, labels) {
  return {
    id: id,
    name: name,
    title: title,
    desc: desc,
    url: url,
    publishedAt: publishedAt,
    labels: labels,
  }
}


function _createProjs() {
  var projs;
  projs = loadFromStorage(KEY)
  console.log(projs);
  if (!projs || !projs.length) {
    projs = []
    projs.push(_createProj(
      'book-proj',
      'book-store',
      'online store',
      makeLorem(),
      'img/book.png',
      timeStamp()
    ))
    projs.push(_createProj(
      'mine-proj',
      'mine sweepers',
      'Web game',
      makeLorem(),
      'projs/mine/koren-minesweeper/mine.png',
      timeStamp()
    ))
    projs.push(_createProj(
      'calc-proj',
      'calculator',
      'Web calculator',
      makeLorem(),
      'img/calc.png',
      timeStamp()
    ))
    projs.push(_createProj(
      'picture-proj',
      `what in the pic`,
      'pictures game',
      makeLorem(),
      'img/pic.png',
      timeStamp()
    ))
    projs.push(_createProj(
      'pacman-proj',
      `PacMan`,
      'pacman game',
      makeLorem(),
      'img/pacman.png',
      timeStamp()
    ))
    projs.push(_createProj(
      'guess-proj',
      `guess who?`,
      'web game',
      makeLorem(),
      'img/guess.png',
      timeStamp()
    ))
    gProjs = projs;
    _saveProjsToStorage();
    return
  }
  gProjs = projs;
  _saveProjsToStorage();
}

function _saveProjsToStorage() {
  saveToStorage(KEY, gProjs)
}


function getProjs() {
  return gProjs;
}

function timeStamp() {
  return Date.now()
}

function contactStorage(phoneNum, email, messege) {
  var contact = {
    phone: phoneNum,
    email: email,
    messege: messege
  }
  gContacts.push(contact)
  saveToStorage(CONTACT, gContacts)
}