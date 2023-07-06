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
        type: String, // Date format should be "YEAR-MM-DD"
        required:[true,"Booking date is required"],
    },
    start_time:{
        type:String, // Date format should be "YEAR-MM-DD HH:MM"
        required:[true,"Start time is required"],
    },
    end_time:{
        type:String, // // Date format should be "YEAR-MM-DD HH:MM"
        required:[true,"End time is required"],
    }
})

customerSchema.pre('save', async function(next){
    this.date = new Date(this.date)
    this.start_time = new Date(this.start_time)
    this.end_time = new Date(this.end_time)
    next()
})


export const Customer =  mongoose.model('Customer',customerSchema)
