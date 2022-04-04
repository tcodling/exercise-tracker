require('dotenv').config();
const express = require("express");
const app = express();
let mongoose;

try {
  mongoose = require("mongoose");
} catch (e) {
  console.log(e);
}

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });



const { Schema } = mongoose;

const userSchema = new Schema({
    username: {type: String, required: true}
})

const exerciseSchema = new Schema({
    username: {type: String, required: true}
})

let User = mongoose.model("User", userSchema)
let Exercise = mongoose.model("Exercise", exerciseSchema)

// FUNCTIONS FOR CRUD OPERATIONS. POTENTIALLY SEPERATE FROM BELOW ROUTES (ROUTER?)

function createAndSaveUser(username, done) {
    let user = new User({
        username: username
    })
    user.save((err, data) => {
        done(null, data)
    })
}

// POTENTIALLY SHOULD BE SEPERATED (THESE ARE THE ROUTES ACCESSED BY THE APP)

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

app.post("/api/users", (req, res, next) => {
    console.log(req.body.username)
    createAndSaveUser(req.body.username, (err, data) => {
        return next(data)
    })
})

const listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});