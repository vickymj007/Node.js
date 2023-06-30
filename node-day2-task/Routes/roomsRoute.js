import express from 'express'
import { createRoom, deleteRoom, getAllRooms, getRoomByID, updateRoom } from '../Controllers/roomController.js'
const router = express.Router()

//CREATE
router.post('/', createRoom)

//UPDATE
router.put('/:id',updateRoom)

//DELETE
router.delete('/:id', deleteRoom)

//GET BY ID
router.get('/:id', getRoomByID)

//GET ALL
router.get('/', getAllRooms)


export default router;