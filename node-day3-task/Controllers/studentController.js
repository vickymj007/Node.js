import { Student } from "../Models/studentModel.js"

export const createStudent= async(req,res,next)=>{
    try {
        const isStudentExist = await Student.findOne({student_id:req.body.student_id})
        if(isStudentExist){
            throw Error("Student ID is already Exist, Try a different ID")
        }
        const student = await Student.create(req.body)
        await student.save()
        res.status(201).json(student)
    } catch (error) {
        next(error)
    }
}

export const getStudents= async(req,res,next)=>{
    try {
        const student = await Student.find()
        res.status(200).json(student)
    } catch (error) {
        next(error)
    }
}