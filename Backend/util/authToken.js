require('dotenv').config();

const jwt = require('jsonwebtoken')

const createJSONWebToken = (id)=>{
return jwt.sign({id},process.env.TOKEN_KEY,{
    expiresIn: 1*24*60*60
})
}

module.exports = {createJSONWebToken}