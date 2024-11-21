const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
