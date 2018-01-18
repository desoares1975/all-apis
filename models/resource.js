'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ResourceSchema = new Schema({
  'name': {
    'type':String,
    'index': {
      'unique': true
    }
  },
  'service': String,
  'options': Object,
  'request': Object,
  'response': Array
});

module.exports = mongoose.model('Resource', ResourceSchema);