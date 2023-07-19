const express = require('express');
const router = express.Router();
const users = require('../models/userSchema');
router.post("/register", async(req, res) => {
    const {name, email, age, mobile, work, address, desc} = req.body;
    if(!name || !email || !age || !mobile || !work || !address || !desc){
        res.status(422).json("Plz fill the data");
    }
    try{
        const preUser = await users.findOne({email: email});
        console.log(preUser);
        if(preUser){
            res.status(422).json("This user is already exists");
        }
        else{
            const addUser = new users({
                name, email, age, mobile, work, address, desc
            });
            await addUser.save();
            res.status(201).json(addUser);
            console.log(addUser);
        }
    } catch(err){
        console.log(err);
    }
})
router.get("/getData", async(req, res) => {
    try{
    const userData = await users.find();
    res.status(201).json(userData);
    console.log(userData);
    }
    catch(err){
        res.status(422).json(err);
        console.log(err);
    }
})
// Get Individual User data
router.get("/getuser/:id", async(req, res) => {
    try{
    console.log(req.params);
    const {id} = req.params;
    const userIndividual = await users.findById({_id : id});
    res.status(201).json(userIndividual);
    console.log(userIndividual);
    }
    catch(err){
        res.status(422).json(err);
    }
})

// Update User Data
router.patch("/updateuser/:id",async(req, res) => {
    try{
        const {id} = req.params;
        const updatedUser = await users.findByIdAndUpdate(id, req.body,{
            new: true,
        });
        res.status(201).json(updatedUser);
        console.log(updatedUser);
    }
    catch(err){
        res.status(422).json(err);
    }
})
//Delete User
router.delete("/deleteuser/:id",async(req, res) => {
    try{
        const {id} = req.params;
        const deleteUser = await users.findByIdAndDelete({_id:id});
        res.status(201).json(deleteUser);
        console.log(deleteUser);
    }
    catch(err){
        res.status(422).json(err);
    }
})
module.exports = router;