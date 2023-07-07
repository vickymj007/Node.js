import express from 'express'
import { createStudent, getStudents } from '../Controllers/studentController.js'

const router = express.Router()

router.get('/', getStudents)
router.post('/', createStudent)

export default router