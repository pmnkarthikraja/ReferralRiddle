const mongoose = require('mongoose')

const Schema = mongoose.Schema

//id will automatically create

//create a schema
const TaskShema = new Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
    }
},{
    timestamps:true
})



//create a model
module.exports = mongoose.model("Task",TaskShema)
