const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const currentDirectory = path.join(__dirname,'timestamp')
const newFolder = path.join(__dirname,'newfolder')



//Api end point which will create a text file in a particular folder which is already exist.
app.get('/',((req,res)=>{
    let currentDate = new Date()
    let timestamp = currentDate.toUTCString().slice(0,-3)
    fs.writeFileSync(`${currentDirectory}/date-time.txt`,timestamp,(err=>{
        if(err){
            console.log(err);
        }
    }))
    res.send("File Created Successfully")
}))


//Api end point to read text file
app.get('/read-file',((req,res)=>{

    fs.readFile(`${currentDirectory}/date-time.txt`,'utf-8',((err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send(data)
        }
    }))

}))

//Api end point which will create a new folder if it is not already exist.
app.get('/make-dir',((req,res)=>{
    let currentDate = new Date()
    let timestamp = currentDate.toUTCString().slice(0,-3)

    if(!fs.existsSync(newFolder)){
        fs.mkdirSync(`${__dirname}/newfolder`,(err=>{
            if (err) {
                console.log(err);
            }
        }))
        fs.writeFileSync(`${newFolder}/date-time.txt`,timestamp,(err=>{
            if(err){
                console.log(err);
            }
        }))
    }else{
        fs.writeFileSync(`${newFolder}/date-time.txt`,timestamp,(err=>{
            if(err){
                console.log(err);
            }
        }))
    }
    res.send('New Folder Created Successfully')
}))



//Server is running in port number 9000
app.listen(9000, ()=>console.log("Server is Running"))
