const userModel = require("../models/UserModels");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userVerification = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.status(403).json({ status: false })
    } else {
      const user = await userModel.findById(data.id)
      if (user) return res.status(200).json({ status: true, user })
      else return res.status(404).json({ status: false })
    }
  })
}

module.exports = {userVerification}