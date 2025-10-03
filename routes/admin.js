const express = require("express");
const router = express.Router();
const Course = require("../models/Course.js");
const Subject = require("../models/Subject");

function isAuthenticated(req, res, next) {
  if (req.session && req.session.user === process.env.ADMIN_USERNAME) {
    return next();
  }
  res.redirect("/admin/login");
}
// Login Page
router.get("/login", (req, res) => {
  res.render("admin/login");
});

// Login Post
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // console.log("Login Attempt:", username, password);
  // console.log("Expected:", process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    req.session.user = process.env.ADMIN_USERNAME;
    // console.log("✅ Login success");
    return res.redirect("/admin/dashboard");
  }

  // console.log("❌ Login failed");
  res.redirect("/admin/login");
});


// Dashboard
router.get("/dashboard", isAuthenticated, async (req, res) => {
  const courses = await Course.find();
  res.render("admin/dashboard", { courses });
});

// Add Course (GET form)
router.get("/course/new", isAuthenticated, (req, res) => {
  res.render("admin/addCourse");
});

// Add Course (POST)
router.post("/course/new", isAuthenticated, async (req, res) => {
  const { code, name, description } = req.body;
  await Course.create({ code, name, description, pageUrl: `/programs/${code}` });
  res.redirect("/admin/dashboard");
});

// Add Subject (GET form)
router.get("/subject/new", isAuthenticated, async (req, res) => {
  const courses = await Course.find();
  res.render("admin/addSubject", { courses });
});

// Add Subject (POST)
router.post("/subject/new", isAuthenticated, async (req, res) => {
  const { courseCode, semester, subjectCode, subjectName, folderLink } = req.body;
  await Subject.create({ courseCode, semester, subjectCode, subjectName, folderLink });
  res.redirect("/admin/dashboard");
});
// Delete Course
router.post("/course/:id/delete", isAuthenticated, async (req, res) => {
  try {
    // Find course first
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.redirect("/admin/dashboard");
    }

    // Delete related subjects by courseCode
    await Subject.deleteMany({ courseCode: course.code });

    // Delete course
    await Course.findByIdAndDelete(req.params.id);

    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.redirect("/admin/dashboard");
  }
});


// Delete Subject
router.post("/subject/:id/delete", isAuthenticated, async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.redirect("/admin/dashboard");
  }
});


// Logout
router.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/"));
});

module.exports = router;
