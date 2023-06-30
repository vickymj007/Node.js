import express from 'express'
import { createCustomer } from '../Controllers/customerController.js'

const router = express.Router()

//CREATE
router.post('/', createCustomer)

//GET BY ID
// router.get('/:id', getCustomerByID)

// //GET ALL
// router.get('/', getAllCustomers)

// //DELETE
// router.delete('/, deleteCustomer')



export default router;