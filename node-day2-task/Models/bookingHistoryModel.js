import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const bookingHistorySchema = mongoose.Schema({
    customer_name:String,
    room_name:String,
    date:String,
    start_time:String,
    end_time:String,
    booking_id:ObjectId,
    booking_status:String
})

export default mongoose.model('Booking_history',bookingHistorySchema)
