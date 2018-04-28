const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Link = require('./models/link');
const Tag = require('./models/tag');
const DBHelper = require('./models/db_helper');
const User = require('./models/user.js');
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const Config = require('./config.js');


const app = express();

app.use(cors());
app.use(bodyParser.json());

//----------------------------------------------------------------------
// DB Setup
//----------------------------------------------------------------------

mongoose.connect("mongodb://127.0.0.1");

DBHelper.createUserIfNeeded();

// This clears the DB!
if (false) {
  DBHelper.empty().then(function() {
    console.log("emptied!");
  }).catch(function(err) {
    console.log("failed to empty :(");
    console.log(err);
  });
}

//----------------------------------------------------------------------
// Auth setup
//----------------------------------------------------------------------

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = Config.jwtSecret;

const strategy = new JwtStrategy(jwtOptions, function(jwtPayload, next) {
	User.findOne({ _id: jwtPayload.userID })
	.then(function(user) {
		if (user) {
			next(null, user);
		} else {
			next(null, false);
		}
	}).catch(function(error) {
		next(error, false);
	});
});

passport.use(strategy);

//----------------------------------------------------------------------
// Routes
//----------------------------------------------------------------------

app.post('/login', function(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	if (!username || !password) {
		postError(res, 402, "Username or password missing");
		return;
	}
	User.findOne({ username: username })
	.then(function(user) {
		if (!user) {
			postError(res, 404, "User not found");
			return;
		}
		user.comparePassword(password, function(error, isValid) {
			if (error || !isValid) {
				postError(res, 401, "Incorrect password");
				return;
			}
			const payload = { userID: user._id };
			const token = jwt.sign(payload, jwtOptions.secretOrKey);
			postSuccess(res, { user: user, token: token });
		});
	}).catch(function(error) {
		postError(res, 404, "User not found");
	});
});

app.get('/links', function(req, res, next) {
	passport.authenticate('jwt', { session: false }, function(err, user, info) {
		DBHelper.getAllLinks(user).then(function(links) {
		  postSuccess(res, links);
		}).catch(function(error) {
		  postError(res, 500, error.message);
		});
	})(req, res, next);
});

app.post('/links/add', passport.authenticate('jwt', { session: false }), function(req, res) {
	const url = req.body.url;
	const tags = req.body.tags;
	const user = req.user;
	if (!user) {
		postError(res, 401, "You need to login to add links");
		return;
	}
	DBHelper.addLink(user, req.body).then(function(link) {
	  postSuccess(res, link);
	}).catch(function(err) {
	  postError(res, 500, err.message);
	});
});

app.get('/tags', function (req, res) {
	passport.authenticate('jwt', { session: false }, function(err, user, info) {
		DBHelper.getAllTags(user).then(function(tags) {
		  postSuccess(res, tags);
		}).catch(function(err) {
		  postError(res, 500, err.message);
		});
	})(req, res);
});

// Seeding (for development only)

app.get('/tags/seed', function(req, res) {
  DBHelper.upsertTags(["science", "technology", "engineering", "funny"])
  .then(function(tags) {
    console.log(tags);
    postSuccess(res, {m: "hi there!"});
  }).error(function(error) {
    console.log(error);
    postError(500, "ouch!");
  });
});

app.get('/links/seed', function(req, res) {
  DBHelper.addLink({
    url: 'http://apple.com',
    tags: [
      'fun',
      'tech'
    ]
  }).then(function(link) {
    postSuccess(res, link);
  }).catch(function(err) {
    postError(res, 500, err.message);
  });
});


//----------------------------------------------------------------------
// Helpers
//----------------------------------------------------------------------

function postError(res, code, message) {
  res.status(code).json({
    code: code,
    message: message
  });
}

function postSuccess(res, object) {
  res.status(200).json({
    data: object,
    error: null
  });
}


app.listen(3060, "127.0.01", function() {
  console.log("Backend fired up!");
});
