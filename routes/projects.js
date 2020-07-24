const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')
const {check} = require('express-validator')
const auth = require('../middleware/auth')

router.post('/',
    auth,
    [
        check('name','El nombre del proyecto es un campo obligatorio').not().isEmpty()
    ],
    projectController.createProject
)

router.get('/',
    auth,
    projectController.getProject
)

router.put('/:id',
    auth,
    [
        check('name','El nombre del proyecto es un campo obligatorio').not().isEmpty()
    ],
    projectController.editProject
)

router.delete('/:id',
    auth,
    projectController.removeProject
)

module.exports = router