  
var mongoose = require('mongoose');

// Create User Schema, and Model
var usersSchema = mongoose.Schema({
	usernames: [String]
})

module.exports = mongoose.model('Users', usersSchema);
