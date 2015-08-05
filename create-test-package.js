'use strict'

module.exports = createPackage

var randomString = require('random-string')
var Promise = require('bluebird')
var mktemp = require('mktemp')
var path = require('path')
var fs = require('fs')
var os = require('os')

var Package = require('./package.js')

function createPackage (nameTemplate, json, ready) {
  if (arguments.length === 1) {
    json = {}
  }
  var name = nameTemplate.replace(/%s/g, randomName)
  var createDir = mktemp.createDir(
    path.join(os.tmpdir(), 'XXXXXXXXXXXXXXXX')
  )

  return Promise.all([
    Promise.resolve(json),
    createDir
  ]).then(onmeta).nodeify(ready)

  function onmeta (tuple) {
    tuple[0].name = name
    var json = JSON.stringify(tuple[0], null, 2)
    var dir = tuple[1]

    return new Promise(function (resolve, reject) {
      fs.writeFile(path.join(dir, 'package.json'), json, function (err) {
        if (err) {
          return reject(err)
        }
        resolve(new Package(dir, name))
      })
    })
  }
}

function randomName() {
  return Date.now() + '-' + randomString()
}
