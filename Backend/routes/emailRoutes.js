const express = require('express')
const {getFriendsEmail,removeAllEmails,writeDefaultEmails,updateEmailWithReferees} = require('../controllers/emailController')

const router = express.Router()

router.get('/emails',getFriendsEmail)
router.post('/sendCodeToMails',updateEmailWithReferees)
// router.post('/emails/removeAll',removeAllEmails)
// router.post('/emails',writeDefaultEmails)

module.exports = router 