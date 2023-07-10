import express from "express";
import { assignStudentToMentor, createMentor, getMentors, assignStudentsToMentor, getStudentsForMentor } from "../Controllers/mentorController.js";

const router = express.Router()



router.get('/',getMentors)
router.post('/',createMentor)
router.put('/assign-student/:name/:student_id',assignStudentToMentor)
router.put('/assign-students/:name',assignStudentsToMentor)
router.get('/get-students/:mentor_name',getStudentsForMentor)


export default router


