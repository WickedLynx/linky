const Promise = require('bluebird');
const async = require('async');
const Link = require('./link');
const Tag = require('./tag');
const mongoose = require('mongoose');

const DBHelper = {
  empty: function() {
    return new Promise.all([Tag, Link].map(this.deleteAllOf));
  },

  deleteAllOf: function(entity) {
    return entity.remove({}).exec();
  },

  getAllTags: function() {
    return Tag.find({}).exec();
  },

  upsertTags: function(tags) {
    return Promise.all(tags.map(this.upsertTag));
  },

  upsertTag: function(tag) {
    return new Promise(function(resolve, reject) {
      Tag.findOneAndUpdate({name: tag}, {name: tag}, {upsert: true})
      .then(function(theTag) {
        resolve(theTag);
      }).catch(function(error) {
        reject(error);
      });
    });
  }
}

module.exports = DBHelper;
