const Task = require('../models/Task')
const Project = require('../models/Project')
const {validationResult} = require('express-validator')

exports.createTask = async(req,res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

    try {
        const {project} = req.body
        const dbProject = await Project.findById(project)
        if(!dbProject) return res.status(404).json({msg: 'Proyecto no Encontrado'})
        if(dbProject.manager.toString() !== req.user.id) return res.status(401).json({msg: 'Acceso Denegado'})
        const task = new Task(req.body)
        await task.save()
        res.json({task})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Hubo un error'})
    }

}

exports.getTask = async(req,res) => {

    try {
        const {project} = req.query
        const dbProject = await Project.findById(project)
        if(!dbProject) return res.status(404).json({msg: 'Proyecto no Encontrado'})
        if(dbProject.manager.toString() !== req.user.id) return res.status(401).json({msg: 'Acceso Denegado'})
        const task = await Task.find({project}).sort({birthDate:-1})
        res.json({task})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Hubo un error'})
    }

}

exports.editTask = async(req,res) => {

    try {
        const {project, name, state} = req.body

        let task = await Task.findById(req.params.id)
        if(!task) return res.status(404).json({msg: 'Tarea no Encontrada'})

        const dbProject = await Project.findById(project)
        if(dbProject.manager.toString() !== req.user.id) return res.status(401).json({msg: 'Acceso Denegado'})

        const newTask = {}

        newTask.name = name
        newTask.state = state

        task = await Task.findByIdAndUpdate({_id: req.params.id}, newTask, {new:true})
        res.json({task})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Hubo un error'})
    }

}

exports.removeTask = async(req,res) => {

    try {
        const {project} = req.query
        console.log(req.query)

        let task = await Task.findById(req.params.id)
        if(!task) return res.status(404).json({msg: 'Tarea no Encontrada'})

        const dbProject = await Project.findById(project)
        if(dbProject.manager.toString() !== req.user.id) return res.status(401).json({msg: 'Acceso Denegado'})


        await Task.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Tarea Eliminada Exitosamente'})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Hubo un error'})
    }

}