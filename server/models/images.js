import mongoose from "mongoose";
const ImageSchema=new mongoose.Schema({
    imgurl:String
});
const ImageUrl= mongoose.model('URL',ImageSchema);
export default ImageUrl;