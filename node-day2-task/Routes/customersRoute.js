import express from 'express'
import { createCustomer, deleteCustomer, getAllCustomers, getCustomerByName } from '../Controllers/customerController.js'

const router = express.Router()

//CREATE
router.post('/', createCustomer)

//GET BY NAME
router.get('/:name', getCustomerByName)

// //GET ALL
router.get('/', getAllCustomers)

// //DELETE
router.delete('/:id', deleteCustomer)



export default router;