'use strict'

var gProjs;
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

