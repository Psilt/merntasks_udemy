const express = require('express')
const router= express.Router()
const userController = require('../controllers/userController')
const {check} = require('express-validator')

router.post('/',
    [
        check('username', 'El campo usuario es obligatorio').not().isEmpty(),
        check('email','Ingrese un email valido').isEmail(),
        check('password','La contraseña debe tener minimo 6 digitos').isLength({min:6})
    ],
    userController.createUser
)
module.exports = router