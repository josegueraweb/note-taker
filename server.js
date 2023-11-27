// Imports the Express.js
const express = require("express");

// Imports the 'path' npm package to resolve path of files that are located on the server
const path = require("path");

// Creates an express app
const app = express();

// Specifys the port that the app will be running on
const PORT = 3001;

// Uses the '.static' middleware to serve files from the public folder
app.use(express.static("public"));

// Creates Express.js routes for default '/', '/send' and '/routes' endpoints
app.get("/", (req, res) => 
res.sendFile(path.join(__dirname, "/public/index.html"))
  );

app.get("/notes", (req, res) => 
res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// listen() method is responsible for listening for incoming connections on the specified port
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
