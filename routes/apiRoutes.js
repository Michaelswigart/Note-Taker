const { request } = require('express');
const notes = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
module.exports = (app) => {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------
  
    // GET
    app.get('/api/notes', (req, res) => res.json(notes));

  
    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------
  
    // POST
    app.post('/api/notes', (req, res) => {
        
      // (1) Create a new object that has 'title' and 'text' as keys,
      // and use the values from req.body.
      var note = {
          id: uuidv4(), 
          title: req.body.title,
          text: req.body.text
      };
      // (2) Then add this newly created object to your 'notes' array,
      // which you already declared above (line 1)
      notes.push(note);
      
      // (3) Save the contents of 'notes' back to the db/db.json file,
      // so that the new note is saved permanently
      fs.writeFile(path.join(__dirname, '../db/db.json', JSON.stringify(notes)));
    
      // (4) Return the new note object back to the client as part of the 
      // response.
      res.json(req.body);
    });

    // DELETE
    app.delete('/api/notes/:id', (req, res) => {
      // (1) Get the ID of the note to delete from the request parameter
      // and assign it to a local variable (hint: req.params)

      // (2) Use notes.findIndex() to locate the note to delete using the ID
      // (hint: notes.findIndex((note) => note.id === <your local variable>))

      // (3) Delete the note from the notes array using notes.splice(<index>, 1)
    });
};
  