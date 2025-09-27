const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  courseCode: { type: String, required: true },
  semester: { type: Number, required: true },
  subjectCode: { type: String, required: true },
  subjectName: { type: String, required: true },
  folderLink: String
});

module.exports = mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);
