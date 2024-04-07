const express = require('express')
const {createUser,getUsers, login} = require('../controllers/userController')
const { userVerification } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/signup',createUser)
router.post('/',userVerification)
router.post('/login',login)
router.get('/',getUsers)
module.exports = router 