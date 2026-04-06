const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  loc: { type: String, required: true },
  tag: { type: String, required: true },
  imagePath: { type: String, required: true },
  large: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('GalleryItem', galleryItemSchema);
