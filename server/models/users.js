import mongoose from "mongoose";
 const UserSchema=new mongoose.Schema({
    name : String,
    email:String,
    password:String,
    ImageName:String,
 });
 const User=new mongoose.model('User',UserSchema);
 export default User;