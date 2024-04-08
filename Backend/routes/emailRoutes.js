const express = require('express')
const {getFriendsEmail,updateEmailWithReferees} = require('../controllers/emailController')

const router = express.Router()

router.get('/emails',getFriendsEmail)
router.post('/sendCodeToMails',updateEmailWithReferees)

module.exports = router 