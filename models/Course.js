const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  pageUrl: String
});

module.exports = mongoose.models.Course || mongoose.model("Course", CourseSchema);
