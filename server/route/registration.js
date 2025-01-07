import express from "express"
import User from "../models/users.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const SECERET_KEY="NOTESAPI"
const registrationRouter=express.Router();
registrationRouter.post("/register",async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser=await User.findOne({email:email});
        // console.log(existingUser);
        if(existingUser){
            return res.status(400).json({message:"User already exist"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const result=await User.create({
            name:name,
            email:email,
            password:hashedPassword,
            ImageName:null
        })
        // console.log(result._id);
        const token=jwt.sign({email:result.email,id:result._id},SECERET_KEY)
        res.status(201).json({token:token});
    } catch (error) {
        console.log(error);
        res.send(500).json({message:"something went word in register route"});
    }
})
export default registrationRouter;