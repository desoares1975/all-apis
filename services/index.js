'use strict';

const request = require('request');
const soap = require('soap');
const Bluebird = require('bluebird');
const mongoose = require('mongoose');

module.exports = {
  'rest': Bluebird.promisify(options => {
    return request[options.method](options.url, options.httpOptions)
    .then((res, body) => {
      let response = {};
      for (let prop in body) {
        if (options.response.indexOf(prop) > -1) {
          response[prop] = body[prop];
        }

      }

      return setImmediate(() => {
        return response;
      });  
    })
    .catch(e => e);
  }),
  'soap': Bluebird.promisify(options => {
    return soap.createClientAsync(options.wsdl)
    .then(client => {
      return client[options.method](options.soapOptions)
      .then(result => {
        let response = {};
        for (let prop in result) {
          if (options.response.indexOf(prop) > -1) {
            response[prop] = result.prop;
          }
        }

        return setImmediate(() => {
          return response;
        });
      });
    })
    .catch(e => e);
  }),
  'mongodb':  Bluebird.promisify(options => {
    let model = mongoose.model(options.modelName, options.model);
    return model[options.method](options.query)
    .then(data => {
      let response = {};

      for (let prop in data) {
        if (options.response.indexOf(prop) > -1) {
          response[prop] = data[prop];
        }
      }

      return setImmediate(() => {
        return response;
      });
    })
    .catch(e => e);
  })
};