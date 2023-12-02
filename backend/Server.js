// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.json'); // Import the db.json file

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// API to get all users
app.get('/users', (req, res) => {
  res.json(db.users);
});

// API to check username and password
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if a user with the provided username and password exists in the database
  const user = db.users.find((user) => user.username === username && user.password === password);

  if (user) {
    // If the user exists, return a success response
    res.json({ success: true });
  } else {
    // If the user does not exist, return an error response
    res.json({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
