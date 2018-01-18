'use strict';

const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

function connect() {
  mongoose.connect('mongodb://localhost/allAPIs', {'useMongoClient': true});
}

mongoose.connection.on('connected', () => {
  console.info('MongoDB connected on allAPIs database');
});

mongoose.connection.on('error', err => {
  console.error(err);
});

mongoose.connection.on('disconnected', () => {
  connect();
});

connect();