import express from "express"
import User from "../models/users.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const SECERET_KEY="NOTESAPI"
const loginRoute=express.Router();
loginRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const existingUser=await User.findOne({email:email});
        console.log(existingUser);
        if(!existingUser){
           return  res.status(404).json({message:"User Not Found"})
        }
       const matchPassword=await bcrypt.compare(password,existingUser.password);
       if(!matchPassword)
       {
        return res.status(405).json({message:"Invalid credintail"});
       }
       const token=jwt.sign({email:existingUser.email,id:existingUser._id},SECERET_KEY)
       const obj={
        Id:existingUser._id,
        ImageName : existingUser.ImageName,
        email : existingUser.email,
        name : existingUser.name
       }
       console.log(obj);
    //    localStorage.setItem("token", token);
       return res.status(201).json({ message: { token: token, obj: obj } });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({message:"something went word in Login route"});
    }
})
export default loginRoute;