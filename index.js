const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')

const server = express()

connectDB()

server.use(cors())

server.use(express.json({extended: true}))

const port = process.env.port || 4000

server.use('/api/users',require('./routes/users'))
server.use('/api/auth',require('./routes/auth'))
server.use('/api/projects',require('./routes/projects'))
server.use('/api/tasks',require('./routes/tasks'))

server.listen(port, '0.0.0.0', ()=>{
    console.log(`El servidor esta escuchando en el puerto ${port}` )
})