const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')

router.post('/',
    auth,
    [
        check('name','El nombre de la tarea es un campo obligatorio').not().isEmpty(),
        check('project','El id del projecto al que pertenece la tarea es un campo obligatorio').not().isEmpty()
    ],
    taskController.createTask
)

router.get('/',
    auth,
    [
        check('project','El id del projecto al que pertenece la tarea es un campo obligatorio').not().isEmpty()
    ],
    taskController.getTask
)

router.put('/:id',
    auth,
    taskController.editTask
)

router.delete('/:id',
    auth,
    taskController.removeTask
)


module.exports = router