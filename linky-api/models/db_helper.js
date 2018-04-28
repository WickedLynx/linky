const Promise = require('bluebird');
const async = require('async');
const Link = require('./link');
const Tag = require('./tag');
const mongoose = require('mongoose');
const validURL = require('valid-url');
const metascraper = require('metascraper');
const got = require('got');
const Config = require('../config.js');
const User = require('./user.js');

const DBHelper = {
  empty: function() {
    return new Promise.all([Tag, Link].map(this.deleteAllOf));
  },

  deleteAllOf: function(entity) {
    return entity.remove({}).exec();
  },

  createUser: function(username, password) {
	  User.create({ username: username, password: password }).then(function(user) {
		  console.log("Created new user ", user.username);
	  }).catch(function(error) {
		  console.log("Could not create user: ", error);
	  });
  },

  createUserIfNeeded: function() {
	  const username = Config.username;
	  const password = Config.password;
	  if (!username || !password) {
		  console.log("Could not read config");
		  return;
	  }
	  const helper = this;
	  User.findOne({ username: username }).then(function(user) {
		  if (!user) {
			  helper.createUser(username, password);
		  }
	  }).catch(function(error) {
		  helper.createUser(username, password);
	  });
  },

  getAllTags: function(user) {
	  if (!user) {
		return Tag.find({user: null}).exec();
	  }
	  return Tag.find({ user: user._id }).exec();
  },

  getAllLinks: function(user) {
	if (!user) {
		return Link.find({user: null}).populate('tags').exec();
	}
	return Link.find({user: user._id }).populate('tags').exec();
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

  addLink: function(user, linkData) {
    const linkURL = linkData.url;
    const tagsToAdd = linkData.tags;

    const helper = this;
    return new Promise(function(resolve, reject) {
      helper.insertLink(user, linkURL).then(function(link) {
        helper.upsertTags(user, tagsToAdd).then(function(tags) {
			helper.associateLinkWithTags(link, tags).then(function(link) {
				helper.fetchMetaForLink(link).then(function(link) {
					resolve(link);
				});
			}).error(reject);
        }).catch(reject);
      }).catch(reject);
    });

  },

  insertLink: function(user, linkURL) {
    if (!validURL.isUri(linkURL)) {
      return Promise.reject(Error("Link is not a valid URL"));
    }
    return new Promise(function(resolve, reject) {
      Link.findOne({user: user._id, url: linkURL}).then(function(savedLink) {
        if (savedLink) {
          reject(Error("Link is already added"));
          return;
        }
		Link.create({user: user._id, url: linkURL}).then(function(link) {
			user.links.push(link);
			user.save().then(function(user) {
				resolve(link);
			}).catch(reject);
		}).catch(reject);
      }).catch(reject);
    });
  },

  upsertTags: function(user, tags) {
    const tagsToAdd = tags.map(function(tag) {
      return tag.trim().toLowerCase();
    });
    if (tagsToAdd.length == 0) {
      return Promise.resolve([]);
    }
	const helper = this;
	return Promise.all(tagsToAdd.map(function(tag) {
		return helper.upsertTag(user, tag);
	}));
  },

  upsertTag: function(user, tag) {
	  return new Promise(function(resolve, reject) {
		  Tag.findOne({ user: user._id, name: tag }).then(function(existingTag) {
			  if (existingTag) {
				  resolve(existingTag);
				  return;
			  }
			  Tag.create({ name: tag, user: user._id}).then(function(createdTag) {
				  user.tags.push(createdTag);
				  user.save().then(function(user) {
					  resolve(createdTag);
				  }).catch(reject);
			  }).catch(reject);
		  });
	  });
  }
}

module.exports = DBHelper;
