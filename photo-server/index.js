'use strict'

var express = require('express')
var cors = require('cors')
var fs = require('fs');
var path = require('path');
var gm = require('gm')
var bodyParser = require('body-parser');
var photoService = require('./PhotoService')
var app = express()

const SERVER_PORT = 8080;

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

app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/v2/photo/next', (req, res) => {
  photoService.next(req, res)
})

app.get('/v2/photo/photo', (req, res) => {
  photoService.photo(req, res)
})

var server = app.listen(SERVER_PORT, '0.0.0.0', function () {
  console.log('Server running at http://localhost:' + SERVER_PORT)
})