const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	posts: [
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post'
	}
	]
});

const Favorites = module.exports = mongoose.model('Favorite', favoriteSchema);

