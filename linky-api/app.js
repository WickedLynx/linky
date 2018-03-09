const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

//----------------------------------------------------------------------
// Routes
//----------------------------------------------------------------------

app.get('*', function(req, res) {
  postSuccess(res, {m: "hi there!"});
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
  res.status(200).json(object);
}


app.listen(3060, "127.0.01", function() {
  console.log("Backend fired up!");
});
