import mongoose from "mongoose";
import New_User from './users.js'
import express from 'express'

const app = express()
app.use(express.json())


const DBconnect = async ()=>{
    try {
    await mongoose.connect('mongodb+srv://vickymj007:Shanks@cluster0.7vhpjei.mongodb.net/guvi_task?retryWrites=true&w=majority')
    console.log("MongoDB Connected");
} catch (error) {
    console.log("MongoDB Disconnected");   
}}

app.post('/test', async (req,res)=>{
    try {
        const user = await New_User.create(req.body)
        await user.save()
        res.setHeader('Set-Cookie',"name=Vignesh")
        res.status(201).json(user)

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Error adding data"})
    }
})


app.listen(9000,()=>{
    DBconnect()
    console.log("Server Connected");
})