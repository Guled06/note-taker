const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
const fs = require("fs");

// TABLES VIEW
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function(req,res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", function(req, res) {
    // Read the db.json file and return all saved notes as JSON.
    res.json(notes);
});

app.post("/api/notes", function(req, res) {
    // Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.

    let newNote = req.body;
    notes.push(newNote);
    neWdb();
    return console.log("A New Note Has Been Added: " + newNote);
});

app.get("/api/notes/:id", function(req,res) {
    // display json for the notes array indices of the provided id
    res.json(notes[req.params.id]);
});

app.delete("/api/notes/:id", function(req, res) {
    notes.splice(req.params.id);
    neWdb();
    console.log("Deleted note with id " + req.params.id);
});



function neWdb() {
    fs.writeFile("db/db.json",JSON.stringify(notes),err => {
        if (err) throw err;
        return true;
    });
}

app.listen(PORT, function() {
    console.log("Listening on PORT: " + PORT);
})
