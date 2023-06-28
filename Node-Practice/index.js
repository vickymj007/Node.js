import express from 'express'
import { browserRouter } from './Routes/routes.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.get('/',(req,res)=>{
    res.sendFile(`D:/Node/Node-Practice/views/index.html`)
})

app.use('/',browserRouter)


app.listen(PORT,()=>{console.log("Server is running")})