const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Link = require('./models/link');
const Tag = require('./models/tag');
const DBHelper = require('./models/db_helper');


const app = express();

app.use(cors());
app.use(bodyParser.json());

//----------------------------------------------------------------------
// DB Setup
//----------------------------------------------------------------------

mongoose.connect("mongodb://127.0.0.1");

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
// Routes
//----------------------------------------------------------------------

app.get('/links', function(req, res) {
  DBHelper.getAllLinks().then(function(links) {
    postSuccess(res, links);
  }).catch(function(error) {
    postError(res, 500, error.message);
  });
});

app.post('/links/add', function(req, res) {
  const url = req.body.url;
  const tags = req.body.tags;
  DBHelper.addLink(req.body).then(function(link) {
    postSuccess(res, link);
  }).catch(function(err) {
    console.log("failed");
    postError(res, 500, err.message);
  });
});

app.get('/tags', function(req, res) {
  DBHelper.getAllTags().then(function(tags) {
    postSuccess(res, tags);
  }).catch(function(err) {
    postError(res, 500, err.message);
  })
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
