const router=require('express').Router();
const Task=require('../models/task');
const User=require('../models/user');
const {authenticateToken}=require('../routes/auth');

// create task
router.post('/create-task', authenticateToken,async (req, res) => {
    try{
        const {title,desc,deadline,reminder}=req.body;
        const {id}=req.headers;
        const newTask=new Task({title:title,desc:desc,deadline:deadline,reminder:reminder});
        const saveTask=await newTask.save();
        const taskId=saveTask._id;
        await User.findByIdAndUpdate(id,{$push:{tasks:taskId._id}})
        res.status(200).json({message:'Task created successfully'});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:'Internal server error'});
    }
})

//get all tasks
router.get('/get-all-tasks', authenticateToken,async (req, res) => {
    try{
        const {id}=req.headers;
        const userData=await User.findById(id).populate({path:'tasks',options:{sort:{createdAt:-1}},
        });
        res.status(200).json({data:userData});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:'Internal server error'});
    }
})

//delete task
router.delete('/delete-task/:id', authenticateToken,async (req, res) => {
    try{
        const {id}=req.params;
        const userId=req.headers.id;
        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId,{$pull:{tasks:id}});
        res.status(200).json({message:'Task deleted successfully'});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:'Internal server error'});
    }
})

// update task
router.put('/update-task/:id', authenticateToken,async (req, res) => {
    try{
        const {id}=req.params;
        const {title,desc,deadline,reminder}=req.body;
        await Task.findByIdAndUpdate(id,{title:title,desc:desc,deadline:deadline,reminder:reminder});
        res.status(200).json({message:'Task updated successfully'});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:'Internal server error'});
    }
})

// update important task
router.put('/update-imp-task/:id', authenticateToken,async (req, res) => {
    try{
        const {id}=req.params;
        const TaskData=await Task.findById(id);
        const ImpTask=TaskData.important;
        await Task.findByIdAndUpdate(id,{important:!ImpTask});
        res.status(200).json({message:'Task updated successfully'});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:'Internal server error'});
    }
})

// update complete task
router.put('/update-comp-task/:id', authenticateToken,async (req, res) => {
    try{
        const {id}=req.params;
        const TaskData=await Task.findById(id);
        const CompTask=TaskData.complete;
        await Task.findByIdAndUpdate(id,{complete:!CompTask});
        res.status(200).json({message:'Task updated successfully'});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:'Internal server error'});
    }
})

// get important tasks
router.get('/get-imp-tasks', authenticateToken,async (req, res) => {
    try{
        const {id}=req.headers;
        const Data=await User.findById(id).populate({path:'tasks',match:{important:true},options:{sort:{createdAt:-1}}});
        const ImpTaskData=Data.tasks;
        res.status(200).json({data:ImpTaskData});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:'Internal server error'});
    }
})

// get completed tasks
router.get('/get-comp-tasks', authenticateToken,async (req, res) => {
    try{
        const {id}=req.headers;
        const Data=await User.findById(id).populate({path:'tasks',match:{complete:true},options:{sort:{createdAt:-1}}});
        const CompTaskData=Data.tasks;
        res.status(200).json({data:CompTaskData});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:'Internal server error'});
    }
})

// get incompleted tasks
router.get('/get-incomp-tasks', authenticateToken,async (req, res) => {
    try{
        const {id}=req.headers;
        const Data=await User.findById(id).populate({path:'tasks',match:{complete:false},options:{sort:{createdAt:-1}}});
        const IncompTaskData=Data.tasks;
        res.status(200).json({data:IncompTaskData});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:'Internal server error'});
    }
})

module.exports=router;