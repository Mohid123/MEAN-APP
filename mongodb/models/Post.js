const mongoose = require('mongoose');
const connectDB = require('../config/db');

const PostSchema = new mongoose.Schema({
  id: String,
  postTitle: String,
  postAuthor: String,
  postContent: String,
  postImgUrl: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);