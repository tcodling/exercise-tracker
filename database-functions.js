// ESTABLISH MONGOOSE CONNECTION
require('dotenv').config();
var mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


// DATABASE SCHEMAS
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {type: String, required: true}
}, {versionKey: false})

const exerciseSchema = new Schema({
    username: {type: String, required: true}
}, {versionKey: false})

let User = mongoose.model("User", userSchema)
let Exercise = mongoose.model("Exercise", exerciseSchema)


// DATABASE FUNCTIONS
function createAndSaveUser(username, done) {
    let user = new User({
        username: username
    })
    user.save((err, data) => {
        done(null, data)
    })
}

function getAllUsers(done) {
    User.find((err, data) => {
        if (data) {
            done(null, data)
        }
    })
}


exports.createUser = createAndSaveUser;
exports.getAllUsers = getAllUsers