const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files (like CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the home page (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Route to serve admin login page
// app.get('/admin-login', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'admin_login.html'));
// });

// Route to serve admin panel page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin_panel.html'));
});

// Route to serve home page (alternative route for home.html)
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'upload.html'));
});

app.get('/uploads', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'upload.html'));
});
// Serve the Programs folder (for static content in that folder)
app.use('/Programs', express.static(path.join(__dirname, 'Programs')));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
