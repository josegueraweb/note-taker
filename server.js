// Imports the Express.js
const express = require("express");

// Imports the 'path' npm package to resolve path of files that are located on the server
const path = require("path");

const api = require('./routes/index.js');

// Specifys the port that the app will be running on
const PORT = process.env.PORT || 3001;

// Creates an express app
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// Uses the '.static' middleware to serve files from the public folder
app.use(express.static("public"));

// GET Route for homepage
app.get("/", (req, res) => 
res.sendFile(path.join(__dirname, "/public/index.html"))
  );

// GET Route for notes
app.get("/notes", (req, res) => 
res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// Listens for incoming connections on the specified port
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);