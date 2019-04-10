require("dotenv").config(); // allows our project read variables from .env files
const path = require("path");
const express = require("express");
// Enables Cross Origin Resource Sharing for our Project
const cors = require("cors");
// Database ORM for NodeJS
const sequelize = require("./config/database");

const jobRoutes = require("./routes/api/job");

// Models
const Job = require("./models/job");
const User = require("./models/user");

const app = express();

// This middleware always runs for all request
// and this present setting allows and domain to
// access resources (our api) from our site.
app.use(cors());

// Create a static directory for our uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// This parses all json request so we can access
// its contents via 'req.body' object
app.use(express.json());

app.use("/api/jobs", jobRoutes);
app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));

// Gets the PORT from the Node env and if it
// does not exists there, set it to 5000
const PORT = process.env.PORT || 5000;

// Associations for our models
User.hasMany(Job, { foreignKey: "userId" });
Job.belongsTo(User, { as: "user", onDelete: "CASCADE" });

// This activates the db connection and runs any
// initial query required eg Model to db table creation
// sequelize
// 	.sync({ force: true })
sequelize
	.sync()
	.then(result => {
		// this creates a http server and listens for incoming requests
		app.listen(PORT, () => console.log("Started on Port " + PORT));
	})
	.catch(err => console.log(err));
