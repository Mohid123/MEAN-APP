const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  name: String,
  avatar: String,
  uploaded: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gallery', GallerySchema);