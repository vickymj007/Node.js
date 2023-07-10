import express from 'express'
import { 
    createStudent, 
    getStudents, 
    changeMentor, 
    assignMentor,
    getPreviousMentor 
} from '../Controllers/studentController.js'


const router = express.Router()

router.get('/', getStudents)
router.post('/', createStudent)
router.put('/change-mentor/:student_id/:mentor_name',changeMentor)
router.put('/assign-mentor/:student_id/:mentor_name',assignMentor)
router.get('/get-previous-mentor/:student_id',getPreviousMentor)

export default router