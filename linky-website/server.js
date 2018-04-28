const express = require('express');
const path = require('path');
const app = express();
const maxAge = 60 * 60 * 24 * 365;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
	res.setHeader("Cache-Control", "max-age=" + maxAge)
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3061);
