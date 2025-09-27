const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const session = require("express-session");
const adminRoutes = require("./routes/admin");

// Import models here
const Course = require("./models/Course");
const Subject = require("./models/Subject");

const app = express();

// Session
app.use(session({
  secret: "superSecretKey",
  resave: false,
  saveUninitialized: true,
}));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.use("/admin", adminRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.render("index", { courses });
  } catch (err) {
    console.error("Error in /:", err);
    res.status(500).send("Error loading home page");
  }
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/uploads", (req, res) => {
  res.render("uploads");
});
app.get("/programs/:code", async (req, res) => {
  try {
    const course = await Course.findOne({ code: req.params.code });
    const subjects = await Subject.find({ courseCode: req.params.code }).sort({ semester: 1 });

    const user = req.session.user;

    if (!course) {
      return res.status(404).render("404", { message: "Course not found", user });
    }

    res.render("program", { course, subjects, user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading program");
  }
});

const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );

