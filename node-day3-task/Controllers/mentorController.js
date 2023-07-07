import { Mentor } from "../Models/mentorModel.js"
import { Student } from "../Models/studentModel.js"


export const getMentors = async (req,res,next)=>{
    try {
        const result = await Mentor.find()
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const createMentor= async (req,res,next)=>{
    try {
        const mentor = await Mentor.create(req.body)
        await mentor.save()
        res.status(201).json(mentor)
    } catch (error) {
        next(error)
    }
}

//To assign a single student to a particular mentor
export const assignStudentToMentor= async(req,res,next)=>{
    try {
        const {name} = req.params
        const {student_id} = req.params
        if(!name || !student_id){
            throw Error("Mentor name or Student ID is missing")
        }
        const mentor = await Mentor.findOne({name})
        if(!mentor){
            throw Error("Mentor is not available in the database")
        }
        const student = await Student.findOne({student_id})
        if(!student){
            throw Error("Student is not available in the database")
        }
        await Mentor.updateOne({name},{$set:{students:[...mentor.students,{name:student.name,student_id:student.student_id}]}})
        await Student.updateOne({student_id},{$set:{mentor_name:mentor.name}})
        res.status(201).json({success:true,mesage:"New student has been assigned to mentor"})
    } catch (error) {
        next(error)
    }
}

export const assignStudentsToMentor = async(req,res,next)=>{
    try {
        const {name} = req.params
        const {students_id} = req.body
        let studentArray = []

        for await (let doc of Student.find()) {
            for(let id of students_id){
                if(await doc.student_id === id){
                    if(await doc.mentor_name === "Not yet assigned"){
                        studentArray = [...studentArray,{name:doc.name,student_id:doc.student_id}]
                        break
                    }
                    throw Error(`Student ID ${id} already has a Mentor`)
                }
            }
        }
        
        if(students_id.length !== studentArray.length){
            return res.status(400).json({
                success:false,
                message:`One or more student ID mentioned in the body is not available in the database. Please enter a valid Student ID`
            })
        }

        for (let student of studentArray){
            await Student.updateOne({student_id:student.student_id},{$set:{mentor_name:name}})
        }

        await Mentor.updateOne({name},{$set:{students:studentArray}})
        res.status(201).json({
            success:true,
            message:"All the students were assigned to mentor",
            mentor_name:name,
            students:studentArray
        })
        
    } catch (error) {
        next(error)
    }
}
