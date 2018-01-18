'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({'extended': true}));
app.use(bodyParser.json());
const Resource = require('./models/resource');
require('./models');
const services = require('./services');

app.get('/', (req, res) => {
  res.status(200).json('OK');
});

app.get('/err', (req, res) => {
  res.status(200).jsdon('OK');
});

app.post('/resources', (req, res) => {
  new Resource(req.body)
  .save()
  .then(resource => {
    res.status(200).json(resource);
  })
  .catch(e => res.status(200).json(e));
});

app.get('/resources/:name', (req, res) => {
  let resourceResponse;
  Resource.findOne({'name': req.params.name})
  .then(resource => {
    if (!resource) {
      return res.status(404).json('RESOURCE NOT FOUND');
    }
    resourceResponse = resource.response;

    return services[resource.service](resource);
  })
  .then(serviceData => {
    let response = {aaaa: 'aaaaaaaaa'};

    for (let key in serviceData) {
      if (resourceResponse.indexOf(key) > -1) {
        response[key] = serviceData[key];
      }
    }

    setImmediate(() => {
      res.status(200).json(response);
    });
  })
  .catch(e => res.status(500).json(e));
});

app.listen(9900, () => {
  console.log('App up and runnig on port 9900');
});