import express from 'express';
import grid from 'gridfs-stream'
import mongoose from 'mongoose';
const url="http://localhost:8000";
let gfs,GridFsBucket;
const conn=mongoose.connection;
conn.once('open',()=>{
    GridFsBucket=new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName: 'photos'
    });
    gfs=grid(conn.db,mongoose.mongo);
    gfs.collection(`photos`);
})
const HostImage=express.Router();
HostImage.get("/images/:filename",async(req,res)=>{
    try{
        console.log("calling hostimages")
        const file = await gfs.collection('photos').findOne({ filename: req.params.filename });
        const readStream=GridFsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    }
    catch(error){
        console.log("pranjal")
        return res.status(500).json("error while calling host image");
    }
})
export default HostImage;