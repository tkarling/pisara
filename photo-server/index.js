'use strict'

const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const gm = require('gm')
const bodyParser = require('body-parser')
const Multer = require('multer')
const photoService = require('./PhotoService')
const app = express()
const rootDir = path.join('/Users/antti/Pictures/Uploads/', 'Golf-Party-June-17-2017') //path.join(__dirname, 'files')

const SERVER_PORT = 8080

const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024
})

photoService.scanImages(rootDir)

const initUses = () => {
  app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
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

app.delete('/v2/photo/:fileName', (req, res) => {
  photoService.delete(rootDir, req, res)
})

app.post('/v2/photo/upload', multer.single('image'), function (req, res, next) {
  const data = req.body
  if (req.file) {
    let newImage = rootDir + '/' + req.file.originalname
    fs.writeFile(newImage, req.file.buffer, 'binary', function (err) {
      if (err) throw err
      photoService.addImage(newImage)
    })
  }
  res.header("Content-Type", "application/json")
  res.send({ "Status": "OK" })
})

var server = app.listen(SERVER_PORT, '0.0.0.0', function () {
  console.log('Server running at http://localhost:' + SERVER_PORT)
})