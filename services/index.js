'use strict';

const Bluebird = require('bluebird');
const request = Bluebird.promisifyAll(require('request'));
const soap = require('soap');
const mongoose = require('mongoose');

module.exports = {
  'rest': Bluebird.promisify((resource, cb) => {
      request.post(`${resource.options.url}:${resource.options.port}/${resource.options.uri}`,
      {'form': resource.request},
      (err, res) => {
        if (err) {
          console.log(err);
          cb(err);
        }

        try {
          let response = JSON.parse(res.body);
          cb(null, response);
        } catch(e) {
          cb(e);
        }
      });
    }),
  'soap': Bluebird.promisify((resource, cb) => {
    soap.createClientAsync(resource.options.wsdl)
    .then(client => {
      client = Bluebird.promisifyAll(client);

      return client[`${resource.options.method}Async`](resource.request);
    })
    .then(result => {
      cb(null, result);
    })
    .catch(e  => cb(e));
  }),
  'mongodb':  Bluebird.promisify((resource, cb) => {
    let model = mongoose.model(resource.options.modelName, new mongoose.Schema(resource.options.model));

    return model[resource.options.method](resource.options.query)
    .then(data => {
      model = {};
      cb(null, data);
    })
    .catch(e  => cb(e));
  })
};