'use strict';

var path = require('path');
var fs = require('fs');
var gm = require('gm')

const mime = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript'
};

var jpegs = []
var nextIndex = 0

exports.next = function (args, res, next) {
  /**
   * Get next photo URL and dimensions from server
   * Gets the photo URL and dimensions of next photo
   *
   * returns Object
   **/
  var file = jpegs[nextIndex]
  nextIndex = Math.floor((Math.random() * jpegs.length)); //(nextIndex + 1) % jpegs.length
  console.log(nextIndex)
  var dimensions = {
    width: 0,
    height: 0,
    URL: ""
  }


  gm(file).size(function (err, size) {
    if (!err) {
      console.log("Amount", jpegs.length, 'width', size.width, 'height', size.height, 'URL', file);
      dimensions.width = size.width
      dimensions.height = size.height
      dimensions.URL = file
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(dimensions))
    } else {
      console.log(err)
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(err))
    }
  });
}

exports.photo = function (args, res, next) {
  /**
   * Get next photo with given URL from server
   * Gets the photo with given URL
   *
   * uRL String 
   * returns Object
   **/
  var file = args.URL.value;
  var type = file.slice((file.lastIndexOf(".") - 1 >>> 0) + 2);
  if (type == null || typeof (type) == 'undefined') type = 'text/plain'
  console.log('file', file, 'type', type)
  var s = fs.createReadStream(file);
  s.on('open', function () {
    res.setHeader('Content-Type', type);
    s.pipe(res);
  });
  s.on('error', function (e) {
    console.log(e)
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 404
    res.end('Not found');
  });
}

function fromDir(startPath, filter, callback) {
  // console.log('Starting from dir ' + startPath + '/');
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    filename = path.resolve(filename)
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter, callback); //recurse
    }
    else if (filter.test(filename)) callback(filename);
  };
};

fromDir('/Users/antti/Desktop/iPhotoExport/', /\.jpg$/, function (filename) {
  jpegs.push(filename)
});

