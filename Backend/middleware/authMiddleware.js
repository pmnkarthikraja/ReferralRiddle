const userModel = require("../models/UserModels");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userVerification = (req, res) => {
  const token = req.cookies.token
  console.log("token",token)
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await userModel.findById(data.id)
      if (user) return res.json({ status: true, user })
      else return res.json({ status: false })
    }
  })
}

module.exports = {userVerification}