import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Student name is required"]
    },
    student_id:{
        type:String,
        required:[true,"Student ID is required"]
    },
    batch:{
        type:String,
        required:[true,"Student batch is required"]
    },
    mentor_name:{
        type:String,
        default:"Not yet assigned"
    },
    previous_mentor_name:{
        type:String,
        default:"Student does not have a previous mentor"
    }
})

export const Student = mongoose.model('Student', studentSchema)