'use strict';

const Bluebird = require('bluebird');
const request = Bluebird.promisifyAll(require('request'));
const soap = require('soap');
const mongoose = require('mongoose');

module.exports = {
  'rest': Bluebird.promisify((resource, cb) => {
      request.post(`${resource.options.url}:${resource.options.port}/${resource.options.uri}`,
      {'form': resource.request},
      (err, res, body) => {
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
  // 'soap': Bluebird.promisify((resource, cb) => {
  //   return soap.createClientAsync(resource.options.wsdl)
  //   .then(client => {
  //     return client[resource.options.method](resource.options.soapresource.options)
  //     .then(result => {
       
  //       });
  //     });
  //   })
  //   .catch(e => {
  //     console.log(e);
  //     return e;
  //   });
  // }),
  // 'mongodb':  Bluebird.promisify((resource, cb) => {
  //   let model = mongoose.model(resource.options.modelName, resource.options.model);
  //   return model[resource.options.method](resource.options.query)
  //   .then(data => {
  //     let response = {};

  //     for (let prop in data) {
  //       if (resource.options.response.indexOf(prop) > -1) {
  //         response[prop] = data[prop];
  //       }
  //     }

  //     return setImmediate(() => {
  //       return response;
  //     });
  //   })
  //   .catch(e => {
  //     console.error(e);
  //     return e;
  //   });
  // })
};