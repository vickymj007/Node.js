import mongoose from "mongoose";

const mentorSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Mentor name is required"]
    },
    age:{
        type:Number,
        required:[true,"Mentor age is required"]
    },
    students:{
        type:[{}],
    }
})

export const Mentor = mongoose.model('Mentor', mentorSchema)