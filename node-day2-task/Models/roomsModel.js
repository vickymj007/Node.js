import mongoose from "mongoose";

const roomModel =  mongoose.Schema(
    {
        room_name:{
            type:String,
            required:[true,"Room name is required"],
            unique:[true,"Room name already exist"]
        },
        seats_available:{
            type:Number,
            required:[true,"Number of seats is required"]
        },
        price_per_hour:{
            type:Number,
            required:[true,"Price is required"]
        },
        amenities:{
            type:[String],
            required:[true,"Amenities is required"]
        },
        isBooked:{
            type:Boolean,
            default:false
        }
    }
)

export default mongoose.model('Rooms',roomModel)