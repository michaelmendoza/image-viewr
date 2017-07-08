
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var path = require('path');
var port = process.env.PORT || 3001;
var fs = require('fs');
var formidable = require('formidable');

//Set up default mongoose connection
//var mongoDB = 'mongodb://127.0.0.1/imageviewr';
//mongoose.connect(mongoDB);

// set up access to index.html
app.use(express.static(path.join(__dirname, '../build')));
app.get('/', function(req, res) {
	console.log('Getting index.html');
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.get('/tools', function(req, res) {
	console.log('Getting tools.html');
	res.sendFile(path.join(__dirname, '../build', 'tools.html'));
});

/*
// set up the RESTful API, handler methods are defined in api.js
var api = require('./controllers/api.js');
app.get('/api', api.list);
app.get('/api/create', api.create);
app.get('/api/delete', api.delete);
*/

// image API, handler methods are defined in image.js
var image_server_port = fs.readFileSync('image_server_port', 'utf8');
app.post('/api/image/add', function (req, res) {
	res.redirect(307, 'http://127.0.0.1:' + image_server_port + req.path);
});
app.post('/api/image/sos', function (req, res) {
	res.redirect(307, 'http://127.0.0.1:' + image_server_port + req.path);
});


app.listen(port);
console.log("App with Data listening on port " + port);

