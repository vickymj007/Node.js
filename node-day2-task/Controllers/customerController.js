import Customer from '../models/customerModel.js'

export const createCustomer = async(req,res,next)=>{
    try {
        const newCustomer = await Customer.create(req.body)
        newCustomer.save()
        res.status(201).json(newCustomer)
    } catch (error) {
        console.log(error);
        next(error)
    }
}
