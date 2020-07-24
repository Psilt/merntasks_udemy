const express = require('express')
const router= express.Router()
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')

router.post('/',
    authController.userAuthentification
)

router.get('/',
    auth,
    authController.authentificatedUser
)

module.exports = router