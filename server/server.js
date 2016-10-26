
var express = require('express');
var app = express();
var path = require('path');

var port = process.env.PORT || 3000;

// set up access to index.html
app.use(express.static(path.join(__dirname, '../build')));
app.get('/', function(req, res) {
	console.log('Getting index.html');
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// set up the RESTful API, handler methods are defined in api.js
app.get('/api', function(req, res) {
	console.log('API - No cluster data found.')
	res.send([""]);
});

app.listen(port);
console.log("App listening on port " + port);