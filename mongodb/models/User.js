const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');

const UserSchema = new mongoose.Schema({
	name: {
		type: String, 
		required: true
	},
	email: {
		type: String, 
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String, 
		required: true
	},
	avatar: {
		type: Array
	}
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = (id, callback) => {
	User.findById(id, callback);
}

module.exports.getUserByUsername = (username, callback) => {
	const query = {username: username}
	User.findOne(query, callback);
}

module.exports.addUser = (newUser, callback) => {
	bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
    	if(err) throw err;
    	newUser.password = hash;
    	newUser.save(callback);
    });
});
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
	bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
		if(err) throw err;
		callback(null, isMatch);
	});
}
