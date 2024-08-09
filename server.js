const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();const sequelize = require('./config/connection');

//Set Up Sessions with Cookies
// Set up sessions with cookies

const sess = {
  secret: 'Super secret secret',
  cookie: {
    // Stored in milliseconds
    maxAge: 30 * 60 * 1000, // expires after 30 minutes
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Set up Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("character", { title: "Create Your Character" });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
