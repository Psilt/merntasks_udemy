const Project = require('../models/Project')
const Task = require('../models/Task')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')

exports.createProject = async(req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    try {
        const project = new Project(req.body)
        project.manager = req.user.id
        project.save()
        res.json(project)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Hubo un error'})
    }
}

exports.getProject = async(req,res) => {
    
    try {
        const projects = await Project.find({manager: req.user.id}).sort({manager: -1})
        res.json(projects)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Hubo un error'})
    }
}

exports.editProject = async(req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    const {name} = req.body
    const newProject = {}

    if(name) newProject.name = name

    try {

        let project = await Project.findById(req.params.id)

        if(!project) return res.status(404).json({msg: 'Proyecto no Encontrado'})

        if(project.manager.toString() !== req.user.id) return res.status(401).json({msg: 'Acceso Denegado'})

        project = await Project.findByIdAndUpdate({_id: req.params.id},{$set : newProject},{new: true})

        res.json({project})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Hubo un error'})
    }
}

exports.removeProject = async(req,res) => {

    try {

        let project = await Project.findById(req.params.id)

        if(!project) return res.status(404).json({msg: 'Proyecto no Encontrado'})

        if(project.manager.toString() !== req.user.id) return res.status(401).json({msg: 'Acceso Denegado'})


        await Task.deleteMany({project: req.params.id});

        await Project.findOneAndRemove({_id: req.params.id})

        res.json({msg: 'Proyecto Eliminado Exitosamente'})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Hubo un error'})
    }
}