import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './Routes/auth.js'
import roomsRoute from './Routes/rooms.js'
import customersRoute from './Routes/customers.js'

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
app.use('/auth', authRoute)
app.use('/rooms', roomsRoute)
app.use('/customers', customersRoute)



//Listening to Server
app.listen(PORT,()=>{
    DBconnect()
    console.log("Server is Running")
})

