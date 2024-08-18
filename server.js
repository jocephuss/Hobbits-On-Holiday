const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sequelize = require("./config/connection");
const helpers = require("./utils/helpers"); // Import helpers
const dice = require("./utils/d20"); // Import dice.js
const routes = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({ helpers }); // Register helpers with Handlebars

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
//set up handlebars engine and views directory
app.set("views", path.join(__dirname, "views"));
//set up express middleware and static files, then import routes

app.use(express.json());
//
app.use(express.urlencoded({ extended: true }));
//set up routes and static files
app.use(express.static(path.join(__dirname, "public")));

// Import routes and apply them to the app

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
}); //start the server and sync the database
