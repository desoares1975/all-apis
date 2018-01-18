'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model('Resource', new mongoose.Schema({
  'name': String,
  'sevice': String,
  'url': String,
  'file': String,
  'request': Object,
  'response': Array
}));