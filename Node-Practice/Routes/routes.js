import express from "express";
import { addNewUser, deleteUser, editUser, getAllUsers, getUserByID } from "../Controllers/mongoData.js";

const router = express.Router()

router.get('/users/all', async(req,res)=>{
    try{
        const users =  await getAllUsers(req.query)
        if(!users){
            return res.status(400).json({Message:"Unable to Fetch Data"})
        }
        res.status(200).json({data:users})
    }catch(err){
        console.log(err);
        res.status(500).json({Message:"Internal Server Error"})
    }
})


router.get('/users/all/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const user = await getUserByID(id)
        if(!user){
            return res.status(400).send("Unable to find Data")
        }
        res.status(200).json({data:user})
        
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Error")
    }
})

router.post('/users/add', async(req,res)=>{
    try {
        const newUser = await addNewUser(req.body)
        if(!newUser){
            return res.status(400).json({message:"Unable to Add User"})
        }
        res.status(200).json({data:newUser})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
})

router.put('/users/edit/:name', async(req,res)=>{
    try {
        const {name} = req.params
        const updatedUser = req.body
        if(!name || !updatedUser){
            return res.status(400).json({message:"Unable to Update User"})
        }
        const result = await editUser(name,updatedUser)
        if(!result){
            return res.status(400).json({message:"Unable to Update User"})
        }
        res.status(200).json({data:result})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})        
    }
})

router.delete('/users/delete/:id',async(req,res)=>{
    try {
        const {id} = req.params
        if(!id){
            return res.status(400).json({message:"Unable to delete user"})
        }
        const result = await deleteUser(id)
        if(!result){
            return res.status(400).json({message:"Unable to delete user"})
        }
        res.status(200).json({data:result})
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error"})
    }
})

export const browserRouter = router;