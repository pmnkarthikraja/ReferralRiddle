const express = require('express')
const {createTask,getTasks, getTaskById, deleteTask, updateTask} =  require('../controllers/taskController')

const router = express.Router()

router.post('/',createTask)
router.get('/',getTasks)
router.get('/:id',getTaskById)
router.delete('/:id',deleteTask)
router.patch('/:id',updateTask)
module.exports = router 