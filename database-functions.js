// ESTABLISH MONGOOSE CONNECTION
require('dotenv').config();
const { ObjectId } = require('mongodb');
var mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


// DATABASE SCHEMAS
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {type: String, required: true}
}, {versionKey: false})

const exerciseSchema = new Schema({
    // id: {type: Object},
    duration: {type: Number},
    description: {type: String},
    date: {type: String}
}, {versionKey: false})

let User = mongoose.model("User", userSchema)
let Exercise = mongoose.model("Exercise", exerciseSchema)


// DATABASE FUNCTIONS
function createUser(username, done) {
    let user = new User({
        username: username
    })
    console.log(user)
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

function getUserById(id, done) {
    User.find({_id: ObjectId(id)}, (err, data) => {
        console.log("data: ", data)
        if (data) {
            done(null, data)
        }
    })
}

function createExercise(requestData, done) {
    let exercise = new Exercise({
        // _id: requestData._id,
        duration: requestData.duration,
        description: requestData.description,
        date: requestData.date

    })
    exercise.save((err, data) => {
        done(null, data)
    })
}

// EXPORTS
exports.createUser = createUser;
exports.getAllUsers = getAllUsers
exports.createExercise = createExercise
exports.getUserById = getUserById