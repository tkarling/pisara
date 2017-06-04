'use strict';

var url = require('url');

var Photos = require('./PhotosService');

module.exports.next = function next (req, res, next) {
  Photos.next(req.swagger.params, res, next);
};

module.exports.photo = function photo (req, res, next) {
  Photos.photo(req.swagger.params, res, next);
};
