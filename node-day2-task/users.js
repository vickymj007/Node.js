import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    age:{type:Number, required:true, min:18, max:100},
    email:{type:String, required:true, min:8, max:20,lowercase:true},
    createdDate:{type:Date,immutable:true,default:()=> Date.now()},
    updatedDate:{type:Date, default:()=> Date.now()}
})

export default mongoose.model('New_User',userSchema)

  