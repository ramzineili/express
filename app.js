const express = require('express');
const moment = require('moment');
const path = require('path')


const app = express();

// Middleware to check if the current time is within working hours
const checkWorkingHours = (req, res, next) => {
  const now = moment();
  const dayOfWeek = now.day();
  const hour = now.hour();


  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour <= 17) {
    next();
  } else {
    res.send('Sorry, we are only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

// Middlewrare
app.use(checkWorkingHours);

// set static folder
app.use(express.static(path.join(__dirname, 'public')));
// Routes
app.get('/', checkWorkingHours, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/services', checkWorkingHours, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

app.get('/contact', checkWorkingHours, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contacts.html'));
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
