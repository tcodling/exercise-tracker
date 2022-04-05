
const express = require("express");
const app = express();

const database = require("./database-functions.js")

// BODY PARSER
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

// ROUTES
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

app.get("/api/users", (req, res, next) => {
    database.getAllUsers((err, data) => {
        return next(data)
    })
})

app.post("/api/users", (req, res, next) => {
    database.createUser(req.body.username, (err, data) => {
        return next(data)
    })
})

// LISTENER
const listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});