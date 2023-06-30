import Room from '../models/roomsModel.js'


export const createRoom = async (req,res,next)=>{
    try {
        const newRoom = new Room(req.body)
        await newRoom.save()
        res.status(201).json(newRoom)
    } catch (error) {
        next(error)
    }
}
export const getAllRooms = async (req,res,next)=>{
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)
    } catch (error) {
        next(error)
    }
}
export const getRoomByID = async (req,res,next)=>{
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (error) {
        next(error)
    }
}
export const updateRoom = async (req,res,next)=>{
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new:true}
            )
        res.status(201).json(updatedRoom)
    } catch (error) {
        next(error)
    }
}
export const deleteRoom = async (req,res,next)=>{
    try {
        await Room.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Room successfully deleted"})
    } catch (error) {
        next(error)
    }
}