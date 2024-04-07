const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

//id will automatically create

//user registration schema
const UserSchema = new Schema({
    userName:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    ownReferralCode:{
        type:String,
        unique:true,
        require:true
    },
    opReferralCode:{
        type:String,
    }
})

UserSchema.pre('save',async function(){
    this.password = await bcrypt.hash(this.password,12)
})

//create a model
module.exports = mongoose.model("User",UserSchema)