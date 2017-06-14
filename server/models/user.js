
var mongoose = require('mongoose');

// Create User Schema, and Model
var userSchema = mongoose.Schema({
	user_name: String,
	email: String, 
	data_urls: [String],
	modules: [String]
})

module.exports =  mongoose.model('User', userSchema);
