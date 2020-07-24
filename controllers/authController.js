const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.userAuthentification = async (req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    const {email, password} = req.body

    try {
        let user = await User.findOne({email})
        if(!user) return res.status(400).json({msg: 'Usuario Inexistente'})

        const actPassword = await bcryptjs.compare(password, user.password)
        if(!actPassword) return res.status(400).json({msg: 'Contraseña Invalida'})

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 3600
        }, (error, token)=>{
            if(error) throw error

            res.json({token})

        })

        
    } catch (error) {
        console.log(error)
    }

}

exports.authentificatedUser = async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json({user})

    } catch (error) {
        res.status(500).json({msg: 'Hubo un error'})
    }

}