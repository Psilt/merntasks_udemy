const mongoose = require('mongoose')

const ProjectSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim:true
    },
    manager:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    birthDate:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Project',ProjectSchema)