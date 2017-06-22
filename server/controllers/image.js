
/* The IMAGE controller
   Exports methods:
   * add - Sends an array of images to the python server to add, waits for and returns the result
   * sos - Sends an array of images to the python server to take the root sum of squares, then returns the result
*/

var Users = require('../models/users.js');
var mongoose = require('mongoose');
var zerorpc = require("zerorpc");
var fs = require("fs");
var formidable = require('formidable');

// make promise version of fs.readFile()
fs.readFileAsync = function (filename) {
	return new Promise(function (resolve, reject) {
		try {
			fs.readFile(filename, function(err, buffer) {
				if (err)
					reject(err);
				else
					resolve(buffer);
			});
		}
		catch (err) {
			reject(err);
		}
	});
};


function loadImages(reqFiles) {
	var promises = [];
	Object.keys(reqFiles).forEach(function (key) {
		promises.push(fs.readFileAsync(reqFiles[key]['path']));
	});

	// return promise that is resolved when all images are done loading
	return Promise.all(promises);
}


function getImages (req, res) {
	"use strict";

	req.files = [];
	var form = new formidable.IncomingForm()

	return new Promise((resolve, reject) => {
		form.parse(req)
		.on('file', function (name, file) {
			req.files.push(file);
		})
		.on('error', function (err) {
			next(err);
		})
		.on('end', function () {
			
			// Make sure we have at least two images to add:
			if (Object.keys(req.files).length < 2) {
				let message = 'We can only operate on 2 or more images!';
				console.log(message);
				res.send(message);
				reject(message);
			}

			loadImages(req.files).then(function (images) {
				resolve(images);
			}, function (err) {
				console.log('Whoops, error uploading your images. Bummer dude.');
				console.log(err);
			});
		});
	})
}

function sendImages (func, images) {
	var client = new zerorpc.Client();
	client.connect("tcp://127.0.0.1:4242");

	return new Promise((resolve, reject) => {
		client.invoke(func, images, function(error, pyres, more) {
			console.log('node image/' + func + ': recieving result of ' + func + '!');
			if (error) {
				reject(error);
			}
			else {
				resolve(pyres);
			}
		});
	})
}

/**
 * Adds an array of images together and then returns the results
 */
exports.add = function (req, res) {
	"use strict";

	getImages(req, res)
		.then(function (images) {
			return sendImages('add', images)
		})
		.then(
			function (pyres) {
				res.writeHead(200 , { 'Content-Type': 'image/png' });
				res.end(pyres,'base64');
			},
			function (error) {
				res.writeHead(500, { 'Content-Type': 'html/text' });
				res.write(error);
				res.end();
			}
		);
}

/**
 * Takes the root sum of squares and then returns the result:
 */
exports.sos = function (req, res) {
	"use strict";

	getImages(req, res)
		.then(function (images) {
			return sendImages('sos', images);
		})
		.then(
			function (pyres) {
				res.writeHead(200 , { 'Content-Type': 'image/png' });
				res.end(pyres,'base64');
			},
			function (error) {
				res.writeHead(500, { 'Content-Type': 'html/text' });
				res.write(error);
				res.end();
			}
		);
}