import mongoose from "mongoose";
import New_User from './users.js'

mongoose.connect('mongodb://127.0.0.1:27017/')

run()
async function run(){
    try {
        const user = await New_User.create(
        {
            name:"Ajay", 
            age:16,
            email:"viC@gmail.com",
        })
        await user.save()
        console.log(user);
    } catch (error) {
        console.log(error.message);
    }
}
