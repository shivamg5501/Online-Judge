import express from 'express';
import upload from '../utils/upload.js';
import ImageUrl from '../models/images.js';
import User from '../models/users.js';
const GetImage=express.Router();
const url="http://localhost:8000";
GetImage.post("/images",upload.single("file"),async(req,res)=>{
    const email=req.email;
    console.log(email);
    if(!req.file){
        return res.status(404).json("file not found");
    }
    const obj={
        imgurl:`${url}/images/${req.file.filename}`
    }
  try{
    const saveImage=new ImageUrl(obj);
    const result = await User.updateOne(
        { email: email },  // Replace with the appropriate query to identify the user
        { $set: { ImageName: obj.imgurl } }
    );
    console.log('User updated with image URL:', result);
    await saveImage.save();
    return res.status(200).json('image uploaded and associated with the group');
  }catch(error){
    console.log(error);
    return res.status(500).json("error while calling /image api");
  }
});

export default GetImage;