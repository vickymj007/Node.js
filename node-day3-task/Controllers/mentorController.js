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
        const mentor = await Mentor.findOne({name:req.params.name})
        const student = await Student.findOne({student_id:req.params.student_id})

        if(!mentor){
            throw Error("Mentor is not available in the database")
        }
        if(!student){
            throw Error("Student is not available in the database")
        }
        if(student.mentor_name !== "Not yet assigned"){
            throw Error(`This student already has ${student.mentor_name} as his mentor`)
        }

        await Mentor.updateOne({name:mentor.name},{$set:{students:[...mentor.students,{name:student.name,student_id:student.student_id}]}})
        await Student.updateOne({student_id:student.student_id},{$set:{mentor_name:mentor.name}})
        res.status(201).json({success:true,mesage:`${mentor.name} has been assigned as a mentor to student ${student.name}`})
    
    } catch (error) {
        next(error)
    }
}

//Assign Multiple students to a single mentor.
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

//Get all students for a particulr mentor
export const getStudentsForMentor = async(req,res,next)=>{
    try {
        const mentor = await Mentor.findOne({name:req.params.mentor_name})
        if(!mentor){
            throw Error("Mentor name is not available in the database, Please enter a valid name")
        }
        res.status(200).json({student_list:mentor.students})
    } catch (error) {
        next(error)
    }
}