import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './Routes/authRoute.js'
import roomsRoute from './Routes/roomsRoute.js'
import customersRoute from './Routes/customersRoute.js'

//Configuring ENV files
dotenv.config()
const PORT = process.env.PORT
const mongoConnectionString = process.env.MONGO_URL

//Connecting to MongoDB with Mongoose
const DBconnect = async ()=>{
    try {
        await mongoose.connect(mongoConnectionString)
        console.log("Connected to MongoDB")
    } catch (error) {
        throw error
    }
}
mongoose.connection.on('disconnected',()=>console.log("MongoDB Disconnected"))

//Initializing Express Server
const app = express()

//Middlewares
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/rooms', roomsRoute)
app.use('/api/customers', customersRoute)
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    res.status(errorStatus).json({
        success:false,
        status : errorStatus,
        message : errorMessage,
        stack: err.stack
    })
})



//Listening to Server
app.listen(PORT,()=>{
    DBconnect()
    console.log("Server is Running")
})

