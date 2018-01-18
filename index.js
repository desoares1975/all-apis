'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('./models');
const Resource = require('./models/resource');
const services = require('./services');

app.use(bodyParser.urlencoded({'extended': true}));
app.use(bodyParser.json());

app.listen(9900, () => {
  console.info('App up on port 9900');
});

app.post('/new', (req, res) => {
  new Resource()
  .save(req.body)
  .then(resource => res.status(200).json(resource))
  .catch(e => res.status(500).json(e));
});

app.get('/resource/:name', () => {
  
});