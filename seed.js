const mongoose = require("mongoose");
require("dotenv").config();

const Course = require("./models/Course");
const Subject = require("./models/Subject");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ Connection error:", err));

(async () => {
  await Course.create({
    code: "BSCS",
    name: "BS Computer Science",
    description: "Empowering innovation through technology, one algorithm at a time.",
    pageUrl: "/programs/BSCS"
  });

  await Subject.create({
    courseCode: "BSCS",
    semester: 1,
    subjectCode: "GEN-103",
    subjectName: "Application of ICT",
    folderLink: "https://drive.google.com/drive/u/1/folders/1DS4uvQGDkMjO1hOOZezkCjvh-BT4p6od?usp=drive_link"
  });

  console.log("✅ Data Seeded");
  mongoose.connection.close();
})();
