const mongoose = require('mongoose')


// TODO: ADD TAGS
// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique: true
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    thumb: {
        type: String,
        required: false
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    hash:{
        type:String,
        required:true,
    },
    salt: {
        type:String,
        required: true
    },
    status:{
        type:String,
        enum:['pending','accepted'],
        default:'pending'
    },
    accountType:{
        type:String,
        enum:['adult',"child"],
        default:"child"
    },
    role:{
        type : String ,
        enum:['student',"admin","teacher"],
        default:"student"
    },
    field:{
        type:[mongoose.Schema.Types.ObjectId],
        required:false
    },
    points: {
        type: Number,
        default: 0
    }
});

//Export the model
module.exports = mongoose.model('UserModels', userSchema)