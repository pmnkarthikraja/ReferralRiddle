const taskModel = require('../models/TaskModels')
const mongoose = require('mongoose')

//To create a Task - POST
 const createTask =async (req,res)=>{
    const {title,description} = req.body
    try{
        const task = await taskModel.create({title,description})
        res.status(200).json(task)
    }catch(e){
        res.status(400).json({
            error:e.message
        })
    }
}

const getTasks = async (req,res)=>{
  try{
    const tasks = await taskModel.find({})
    res.status(200).json(tasks)
  }catch(e){
    console.log(e)
    res.status(400).json(e.message)
  }
}

const getTaskById =async (req,res)=>{
  //get id from req params
  const {id} = req.params
  //validate valid id against mongoose schema
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"task not found"})
  }
  
  try{
    const task = await taskModel.findById(id)
    res.status(200).json(task)
  }catch(e){
    res.status(400).json(e.message)
  }
}

const deleteTask = async (req,res)=>{
  const {id}  = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"task not found"})
  }
  try{
    const rightRes = await taskModel.findByIdAndDelete({
      _id:id
    })
    res.status(200).json(rightRes)
  }catch(e){
    res.status(400).json(e.message)
  }
}

const updateTask =async (req,res)=>{
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"Task Not Found"})
  }

  try{
    const task =await taskModel.findByIdAndUpdate({
      _id:id
    },{
      ...req.body
    })
    res.status(200).json(task)
  }catch(e){
    res.status(400).json({error:e.message})
  }
}

module.exports = {createTask,getTasks,getTaskById,deleteTask,updateTask}