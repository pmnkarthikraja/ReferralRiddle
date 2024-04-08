const mongoose = require('mongoose')

const Schema = mongoose.Schema

const refereeSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    referralCode: {
      type: String,
      required: true,
      unique: true
    }
  });

const emailSchema = new Schema({
    address:{
        type:String,
        required:true,
        unique:true,
    },
    referees:[refereeSchema]
})

const EmailSchema = mongoose.model("Email",emailSchema)
const RefereeSchema = mongoose.model('Referee', refereeSchema);

module.exports = {EmailSchema,RefereeSchema}