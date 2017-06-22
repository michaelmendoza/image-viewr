
/* The IMAGE controller
   Exports methods:
   * add - Sends an array of images to the python server to add, waits for and returns the result
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


function getAllImages(reqFiles) {
	var promises = [];
	Object.keys(reqFiles).forEach(function (key) {
		promises.push(fs.readFileAsync(reqFiles[key]['path']));
	});

	// return promise that is resolved when all images are done loading
	return Promise.all(promises);
}


/**
 * Adds an array of images together and then returns the results
 */
exports.add = function (req, res) {
	"use strict";

	req.files = [];
	var form = new formidable.IncomingForm()
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
				let message = 'We can only add 2 or more images!';
				console.log(message);
				res.send(message);
				return;
			}

			getAllImages(req.files).then(
				// Promise resolved:
				function(images) {
					var client = new zerorpc.Client();
					client.connect("tcp://127.0.0.1:4242");

					client.invoke("add", images, function(error, pyres, more) {

						console.log('node image/add: recieving result of add!');

						if (error) {
							res.writeHead(500, { 'Content-Type': 'image/png' });
							res.write(error);
							res.end();
							return;
						}

						res.writeHead(200 , { 'Content-Type': 'image/png' });
						res.end(pyres,'base64');
					});
				},
				// Promise failed:
				function(err) {
					console.log('Whoops, error uploading your images. Bummer dude.');
				}
			);

		});

}
