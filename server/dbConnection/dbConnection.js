import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const DBConnection=async()=>{
 const MONGO_URI=process.env.MONGODB_URL;
 try {
    await mongoose.connect(MONGO_URI,{useNewUrlParser:true});
    console.log("DB is connected Successfully");
 } catch (error) {
    console.log("error while connecting to mongoDB",error.message);
 }
};
export default DBConnection;