'use strict'

module.exports = Package

var Promise = require('bluebird')
var rimraf = require('rimraf')
var assert = require('assert')

function Package (dir, name) {
  this.dir = dir
  this.name = name
}

var proto = Package.prototype

proto.delete = function (ready) {
  var pkg = this
  return new Promise(function (resolve, reject) {
    assert(pkg.dir.length)
    assert(pkg.dir !== '/')
    rimraf(pkg.dir, function (err) {
      if (err) {
        return reject(err)
      }
      return resolve(pkg)
    })
  }).nodeify(ready)
}
