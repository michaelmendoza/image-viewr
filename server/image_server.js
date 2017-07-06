
var express = require('express');
var app = express();
var fs = require('fs');
var port = process.env.PORT || 3001;

// Store the port so the client server knows how to reach us:
fs.writeFile("image_server_port", port, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("The port was saved!");
});

// set up the RESTful API
var image = require('./controllers/image.js');
app.post('/api/image/add', image.add);
app.post('/api/image/sos', image.sos);


app.listen(port);
console.log("Image server listening on port " + port);