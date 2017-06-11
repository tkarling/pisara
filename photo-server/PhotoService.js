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

var jpegs = [],
    queue = []
var nextIndex = 0

exports.next = function (req, res) {
  /**
   * Get next photo URL and dimensions from server
   * Gets the photo URL and dimensions of next photo
   *
   * returns Object
   **/
  if (jpegs.length == 0 && queue.length == 0) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(dimensions))
    return
  }

  const chooseNextFile = () => {
    if (queue.length > 0) {
      jpegs.push(queue.shift())
      nextIndex = jpegs.length - 1
    }
    return jpegs[nextIndex]
  }

  var fileName = chooseNextFile()
  nextIndex = Math.floor((Math.random() * jpegs.length));
  console.log("NextIndex", nextIndex)

  getDimensions(res, fileName)
}

exports.photo = function (req, res) {
  /**
   * Get next photo with given URL from server
   * Gets the photo with given URL
   *
   * uRL String 
   * returns Object
   **/
  var file = req.headers.url;
  var type = file.slice((file.lastIndexOf(".") - 1 >>> 0) + 2);
  if (type == null || typeof (type) == 'undefined') type = 'text/plain'
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

exports.addImage = function (fileName) {
  /**
   * Pushes new image (name) to a specific queue from which it will be moved to 
   * the jpegs buffer and displayed next.
   *
   * fileName String 
   **/
  queue.push(fileName)
}

//let rootDir = '/Users/antti/Desktop/iPhotoExport/'
exports.setRootDir = function (rootDirectory) {
  /**
   * Sets the root directory and scans it and it's subdirectories recursively 
   * in order to find the images (.jpg) of which filenames will be added to 
   * an array.
   *
   * rootDirectory String 
   **/
  console.log("RootDirectory:", rootDirectory)
  fromDir(rootDirectory, /\.jpg$/, function (fileName) {
    jpegs.push(fileName)
  });
}

const getDimensions = (res, fileName) => {
  var dimensions = {
    width: 0,
    height: 0,
    URL: ""
  }

  gm(fileName).size(function (err, size) {
    if (!err) {
      console.log("Files:", jpegs.length, 'width:', size.width, 'height:', size.height, 'fileName:', fileName);
      dimensions.width = size.width
      dimensions.height = size.height
      dimensions.URL = fileName
    } else {
      console.log(err)
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(dimensions))
  });
}

const fromDir = (startPath, filter, callback) => {
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
      fromDir(filename, filter, callback);
    }
    else if (filter.test(filename)) callback(filename);
  };
};

