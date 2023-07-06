import { createError } from '../Utilities/handleErrors.js'
import {Customer} from '../Models/customerModel.js'
import Room from '../Models/roomsModel.js'
import Booking_history from '../Models/bookingHistoryModel.js'
import { ObjectId } from 'mongodb'


export const createCustomer = async(req,res,next)=>{
    try {
        const room = await Room.findOne({room_name:req.body.room_id})
        if(!room){
            throw new Error("Room name is not available, enter a valid room name")
        }
        if(!room.isBooked){
            const newCustomer = await Customer.create(req.body)
            await Room.updateOne(
                {room_name:newCustomer.room_id},
                {$set:{
                    isBooked:true,
                    bookingDetails:{
                        customerName:newCustomer.name,
                        date:newCustomer.date,
                        start_time:newCustomer.start_time,
                        end_time:newCustomer.end_time
                }}})

            await newCustomer.save()

            const updateHistory = await Booking_history.create(
                {
                    customer_name:newCustomer.name,
                    room_name:newCustomer.room_id,
                    date:newCustomer.date,
                    start_time:newCustomer.start_time,
                    end_time:newCustomer.end_time,
                    booking_id:new ObjectId(newCustomer._id),
                    booking_status:"Booked"
                }
            )
            await updateHistory.save()
            res.status(201).json(newCustomer)
        }
        throw new Error("Room was already booked, try a different room")
    } catch (error) {
        next(createError(500,error.message))
    }
}


export const getAllCustomers = async (req,res,next)=>{
    try {
        const result = await Customer.find()
        res.status(200).json(result)
    } catch (error) {
        next(createError(500,"Unable to fetch data"))
    }
}

export const getCustomerByName = async (req,res,next)=>{
    try {
        const {name}= req.params
        if(!name){
            throw new Error("Enter valid customer name")
        }
        const result = await Customer.find()
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}


export const deleteCustomer = async (req,res,next)=>{
    try {
        const {id} = req.params
        const customer = await Customer.findOne({_id:new ObjectId(id)})
        if(!customer){
            throw new Error("Unable to find customer")
        }
        await Room.updateOne(
            {room_name:customer.room_id},
            {
                $set:{
                    isBooked:false,
                    bookingDetails:{
                        customerName:"",
                        date:"",
                        start_time:"",
                        end_time:""
                }}
            })
        const result= await Customer.deleteOne({_id:customer._id})
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}
