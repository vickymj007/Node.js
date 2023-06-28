import express from 'express'
import Room from '../models/Room.js'
const router = express.Router()

//CREATE
router.post('/', async(req,res)=>{
    try {
        const newRoom = new Room(req.body)
        await newRoom.save()
        res.status(201).json(newRoom)
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error)
    }
})

//UPDATE
router.put('/:id', async(req,res)=>{

    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}
            )
        res.status(201).json(updatedRoom)
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE
router.delete('/:id', async(req,res)=>{
    try {
        await Room.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Room successfully deleted"})
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET BY ID
router.get('/:id', async(req,res)=>{
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ALL
router.get('/', async(req,res)=>{
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch (error) {
        req.status(500).json(error)
    }
})


export default router;