const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
    const token = req.header('x-auth-token')

    if(!token) return res.status(401).json({msg: 'No se encontro token, acceso denegado'})

    try {
        const cypher = jwt.verify(token, process.env.SECRET_KEY)
        req.user = cypher.user
        next()
    } catch (error) {
        res.status(401).json({msg: 'Token no valido'})
    }
}