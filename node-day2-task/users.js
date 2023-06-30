import bcrypt from 'bcrypt'
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{type:String, required:true, min:8, max:20,lowercase:true},
    password:{type:String,required:true,minlength:5}
},{timestamps:true})


userSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password, salt)
        console.log("Pre Working");
        next()
    } catch (error) {
        console.log(error.message);
    }
})

export default mongoose.model('New_User',userSchema)

  