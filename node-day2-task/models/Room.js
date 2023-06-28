import mongoose from "mongoose";

const roomModel = new mongoose.Schema(
    {
        room_name:{
            type:String,
            required:true
        },
        seats_available:{
            type:Number,
            required:true
        },
        price_per_hour:{
            type:Number,
            required:true
        },
        amenities:{
            type:[String],
            required:true
        },
        isBooked:{
            type:Boolean,
            default:false
        }
    }
)

export default mongoose.model('Rooms',roomModel)