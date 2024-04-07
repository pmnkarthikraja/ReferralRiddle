const express = require('express')
const { signUp,getUsers, login} = require('../controllers/userController')
const { userVerification } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/signup',signUp)
router.post('/',userVerification)
router.post('/login',login)
router.get('/',getUsers)
module.exports = router 