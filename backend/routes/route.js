const express= require('express');
const router = express.Router();
const User =  require('../Model/user');

//create user 
//http://localhost:4000/createusers
router.post('/createusers',async(req,res)=>{
    try{
          const user = new User(req.body);
          await user.save();
          res.status(201).json(user) ;
    }
    catch(err){
           res.status(400).json({error:err.message})
    }
});
//get all users
//http://localhost:4000/allusers
router.get('/allusers',async(req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(err){
          res.status(500).json({error:err.message});
    }
});


// Get a user by ID
//http://localhost:4000/users/db_user_id
router.get('/users/:id',async(req,res)=>{
    try{
         const user = await User.findById(req.params.id);
         if(user){
            res.status(200).json(user);
         }
         else{
            res.status(400).json({err:'user not found'})
         }
    }
    catch(err){
            res.status(500).json({error:err.message});
    }
});

// Update a user by ID
//http://localhost:4000/userupdate/db_user_id
router.put('/userupdate/:id',async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(user){
            res.status(200).json(user);
        }
        else{
            res.status(404).json({error:'user not found'})
        }
    }
    catch(err){
          res.status(400).json({error:err.message});
    }
})

// Delete a user by ID
router.delete('/userdelete/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.status(200).json({ message: 'User deleted' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports=router;