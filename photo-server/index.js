'use strict'

const express = require('express')
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const gm = require('gm')
const bodyParser = require('body-parser');
const photoService = require('./PhotoService')
const app = express()
const fileDir = path.join(__dirname, 'files');
const uploadDir = path.join(__dirname, 'uploads');

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

const initUses = () => {
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
  })
  app.use(cors())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())
}

initUses()

app.get('/v2/photo/next', (req, res) => {
  photoService.next(req, res)
})

app.get('/v2/photo/photo', (req, res) => {
  photoService.photo(req, res)
})

app.post('/v2/photo/upload', function (req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  res.end()
});
 
app.post('/v2/photo/upload1', function (req, res) {
  console.log(req)
  res.header("Content-Type", "application/json")
  res.send({"Status": "OK"})
});

var server = app.listen(SERVER_PORT, '0.0.0.0', function () {
  console.log('Server running at http://localhost:' + SERVER_PORT)
})