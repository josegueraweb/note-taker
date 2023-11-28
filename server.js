// Importing JS modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('./helpers/uuid'); // Importing a custom uuid module

// Makes an Express app
const app = express();
const PORT = process.env.PORT || 3000; // 

// Imports JS middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTML Routes ... these guys serve files to client
// Serves homepage 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Serves notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// API Routes ... these guys handle client requests to the app
// Gets all notes from the db.json file
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    }
    res.json(JSON.parse(data));
  });
});

// Add a new note to the db.json file
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  fs.readFile('./db/db.json', 'utf8', (err, data) => {

    if (err) {
      console.error(err);
    }
    const notes = JSON.parse(data);
    newNote.id = uuid();
    notes.push(newNote);
    fs.writeFile(
      './db/db.json', 
      JSON.stringify(notes, null, 2), err => {
      if (err) {
        console.error(err);
      }
      res.json(newNote); 
    });
  });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});