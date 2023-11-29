const express = require('express');

const homeRouter = require('./');
const notesRouter = require('./notes');

const app = express();

app.use('./', homeRouter);
app.use('/notes', notesRouter);

module.exports = app;