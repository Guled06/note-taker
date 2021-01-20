const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public", {extensions: ["html"]}));
const fs = require("fs");


app.get("/api/notes", function(req, res) {
    // Read the db.json file and return all saved notes as JSON.
    fs.readFile('db/db.json', (err, data) => {
        if (err) throw err;
        let notes = JSON.parse(data);
        res.json(notes);
      });
});

app.post("/api/notes", function(req, res) {
    // Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.

    fs.readFile('db/db.json', (err, data) => {
        if (err) throw err;
        let newNote = req.body;
        console.log(newNote);
        let notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile("db/db.json", JSON.stringify(notes),err => {
            if (err) throw err;
            return res.json(notes);
        });
      });
});

app.get("/api/notes/:id", function(req,res) {
    // display json for the notes array indices of the provided id
    res.json(notes[req.params.id]);
});


app.delete("/api/notes/:id", function(req, res) {

    fs.readFile('db/db.json', (err, data) => {
        if (err) throw err;
        let newNote = req.params.id;
        let notes = JSON.parse(data);
        notesSaved = notesSaved.filter(fs.writeFile("db/db.json", JSON.stringify(newNote),err => {
            if (err) throw err;
            return res.json(notes);
        }));

    });

});

    
app.get("*", function(req,res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function() {
    console.log("Listening on PORT: " + PORT);
});