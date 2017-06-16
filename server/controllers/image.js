
/* The IMAGE controller
   Exports 1 method:
   * add - Sends two images to the python server to add, waits for and returns the result
*/

var Users = require('../models/users.js');
var mongoose = require('mongoose');
var zerorpc = require("zerorpc");
var fs = require("fs");

/**
 * Adds two images together and then returns the results
 */
exports.add = function(req, res) {

	var client = new zerorpc.Client();
	client.connect("tcp://127.0.0.1:4242");

	// Test data: two images to add together
	var im1 = fs.readFileSync('im1.png');
	var im2 = fs.readFileSync('im2.png');

	client.invoke("add", [im1, im2], function(error, pyres, more) {
	    console.log('node image/add: recieving something!');
	    res.send(pyres);
	});
}
