const mongoose = require("mongoose")

const schoolSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:100,
        minlength:5
    },
    address:{
        type:String,
        required:"Address is required",
        minlength:5,
        maxlength:400
    },
    count:{
        type:Number,
        required:true,
        min:5,
        max:10000
    }
})

module.exports = mongoose.model("schoolData",schoolSchema)