import { Mentor } from "../Models/mentorModel.js"
import { Student } from "../Models/studentModel.js"


//To create a student
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

//To get all students
export const getStudents= async(req,res,next)=>{
    try {
        const student = await Student.find()
        res.status(200).json(student)
    } catch (error) {
        next(error)
    }
}

//To change mentor for a student
export const changeMentor= async(req,res,next)=>{
    try {
        const student = await Student.findOne({student_id:req.params.student_id})
        const mentor = await Mentor.findOne({name:req.params.mentor_name})

        if(!student || !mentor){
            throw Error("Student ID or Mentor name is not available in the database")
        }
        
        if(student.mentor_name === mentor.name){
            throw Error(`This student already has ${mentor.name} as his mentor`)
        }

        if(student.mentor_name !== "Not yet assigned"){
            
            const previousMentor = await Mentor.findOne({name:student.mentor_name})
            const newStudentList = previousMentor.students.filter(stud => stud.student_id !== student.student_id)
            
            //Remove student from Previous Mentor Student list
            await Mentor.updateOne(
                {name:previousMentor.name},
                {$set:{students:[...newStudentList]}}
            )
            
            //Update previous mentor to the student
            await Student.updateOne(
                {student_id:student.student_id},
                {$set:{previous_mentor_name:student.mentor_name}}
            )

        }

        //Update mentor name to the student
        await Student.updateOne(
            {student_id:student.student_id},
            {$set:{mentor_name:mentor.name}}
        )

        //Push new student list to the current mentor
        await Mentor.updateOne(
            {name:mentor.name},
            {$set:{students:[...mentor.students,{name:student.name,student_id:student.student_id}]}}
        )

        res.status(201).json({
            success:true,
            message:`${mentor.name} has been assigned as a new mentor to the student ${student.name}`
        })

    } catch (error) {
        next(error)
    }
}

//To assign mentor for a student
export const assignMentor=async (req,res,next)=>{
    try {
        const student = await Student.findOne({student_id:req.params.student_id})
        const mentor = await Mentor.findOne({name:req.params.mentor_name})

        if(!student || !mentor){
            throw Error("Student ID or Mentor name is not available in the database")
        }

        if(student.mentor_name !== "Not yet assigned"){
            throw Error(`This student already has ${student.mentor_name} as his mentor, To change mentor for a student kindly use the appropriate end point`)
        }

        //Assign mentor to student
        await Student.updateOne(
            {student_id:student.student_id},
            {$set:{mentor_name:mentor.name}}
        )

        //Update new student list to Mentor
        await Mentor.updateOne(
            {name:mentor.name},
            {$set:{students:[...mentor.students,{name:student.name,student_id:student.student_id}]}}
        )
        
        res.status(201).json({
            success:true,
            message:`${mentor.name} has been assigned as a mentor to the student ${student.name}`
        })

    } catch (error) {
        next(error)
    }
}

export const getPreviousMentor = async (req,res,next)=>{
    try {
        const student = await Student.findOne({student_id:req.params.student_id})
        if(!student){
            throw Error("Student ID is not available in the database, Enter a valid ID")
        }

        res.status(200).json({
            success :true,
            previous_mentor_name: student.previous_mentor_name
        })
    } catch (error) {
        next(error)
    }
}