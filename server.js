const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

// Set up Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('characterCreation');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});