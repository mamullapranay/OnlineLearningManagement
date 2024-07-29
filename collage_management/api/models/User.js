const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    }, 
    email : {
        type : String,
        required : true,
        unique : true,
    }, 
    password : {
        type : String,
        required : true,
    },
    dob : {
        type : Date,
        required : true,
    }, 
    role : {
        type : String,
        required : true,
    },
    courses : {
        type : Array,
        default : []
    },
    personalEvents : {
        type : Array,
        default : []
    }
},{timestamps: true});

module.exports = mongoose.model("User", userSchema);