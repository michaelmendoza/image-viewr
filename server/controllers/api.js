
/* The API controller
   Exports 3 methods:
   * list - Returns a list of users
   * create - Creates a new users
   * delete - Deletes database
*/

var Users = require('../models/users.js');
var mongoose = require('mongoose');

/**
 * Retrieves users data from database 
 */
exports.list = function(req, res) {
	Users.find(function(err, users) {
		console.log('Users data found: ', users);
		res.send(users);
	});
}

/**
 * Creates and saves a set of users data
 */
exports.create = function(req, res) {

	var count = 10;
	var users = new Users();
	var usernames = [];
	for(var i = 0; i < count; i++) {
		usernames.push('user-'+i);
	} 
	users.usernames = usernames;
	
	users.save(function(err, data) {
		console.log('Saving Data ...');
		res.send('Saving Data ...');
	})

}

/**
 * Drops entire database - Use with caution
 */
exports.delete = function(req, res) {
	mongoose.connection.db.dropDatabase();
	console.log('Deleting Database ... ');
	res.send('Deleting Database ...');
}




