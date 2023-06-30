import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Customer name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already exist"]
    },
    room_id:{
        type:String,
        required:[true,"Room ID is required"],
    },
    date:{
        type:String, // YYYY-MM-DD format
        required:[true,"Booking date is required"],
    },
    start_time:{
        type:"String", // HH:MM format
        required:[true,"Start time is required"],
    },
    end_time:{
        type:"String", // HH:MM format
        required:[true,"End time is required"],
    }
})

export default mongoose.model('Customer',customerSchema)