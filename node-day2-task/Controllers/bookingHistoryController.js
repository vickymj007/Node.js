import Booking_history from '../Models/bookingHistoryModel.js'
import { createError } from '../Utilities/handleErrors.js'

export const getBookingHistory = async (req,res)=>{
    try {
        const result = await Booking_history.find()
        if(result.length == 0){
            throw new Error("History Not Available")
        }
        res.status(200).json(result)
    } catch (error) {
        next(createError(500,"Unable to fetch any data"))
    }
}