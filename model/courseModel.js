const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var courseSchema = new mongoose.Schema({
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModels',
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:false,
    },
    thumb:{
        type:String,
        required:true,
    },
    studentCounts: {
        type: Number,
        default: 0
    }
},{timestamps:true})

//Export the model
module.exports = mongoose.model('Course', courseSchema);