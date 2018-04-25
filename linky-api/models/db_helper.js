const Promise = require('bluebird');
const async = require('async');
const Link = require('./link');
const Tag = require('./tag');
const mongoose = require('mongoose');
const validURL = require('valid-url');
const metascraper = require('metascraper');
const got = require('got');

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

  getAllLinks: function() {
    return Link.find({}).exec();
  },

  associateLinkWithTags: function(link, tags) {
    tags.forEach(function(tag) {
      link.tags.push(tag);
      tag.links.push(link);
    });

    const helper = this;
    return new Promise(function(resolve, reject) {
      Promise.all(tags.map(helper.saveTag)).then(function() {
        link.save().then(resolve).catch(reject);
      }).catch(reject);
    });
  },

  saveTag: function(tag) {
    return tag.save();
  },

  fetchMetaForLink: function(link) {
	  if (!link.url) { return; }
	  return new Promise(function(resolve) {
		  got(link.url).then(function(response, url) {
			  metascraper({html: response.body, url: response.url}).then(function(meta) {
				  if (!meta) { 
					  resolve(link);
					  return;
				  }
				  link.title = meta.title;
				  link.image = meta.image;
				  link.description = meta.description;
				  link.author = meta.author;
				  link.publisher = meta.publisher;
				  link.save(function(error, link) {
					  resolve(link);
				  });
			  }).catch(function(error) {
				  resolve(link);
			  });
		  }).catch(function(error) {
				resolve(link);
		  });
	  });
  },

  addLink: function(linkData) {
    const linkURL = linkData.url;
    const tagsToAdd = linkData.tags;

    const helper = this;
    return new Promise(function(resolve, reject) {
      helper.insertLink(linkURL).then(function(link) {
        helper.upsertTags(tagsToAdd).then(function(tags) {
			helper.associateLinkWithTags(link, tags).then(function(link) {
				helper.fetchMetaForLink(link).then(function(link) {
					resolve(link);
				});
			}).error(reject);
        }).catch(reject);
      }).catch(reject);
    });

  },

  insertLink: function(linkURL) {
    if (!validURL.isUri(linkURL)) {
      return Promise.reject(Error("Link is not a valid URL"));
    }
    return new Promise(function(resolve, reject) {
      Link.findOne({url: linkURL}).then(function(savedLink) {
        if (savedLink) {
          reject(Error("Link is already added"));
          return;
        }
        Link.create({url: linkURL}).then(resolve).catch(reject);
      }).catch(reject);
    });
  },

  upsertTags: function(tags) {
    const tagsToAdd = tags.map(function(tag) {
      return tag.toLowerCase();
    });
    if (tagsToAdd.length == 0) {
      return Promise.resolve([]);
    }
    return Promise.all(tagsToAdd.map(this.upsertTag));
  },

  upsertTag: function(tag) {
      return Tag.findOneAndUpdate({name: tag}, {name: tag}, {upsert: true, new: true}).exec();
  }
}

module.exports = DBHelper;
