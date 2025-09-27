// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  projectUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
