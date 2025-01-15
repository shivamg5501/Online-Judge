import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGODB_URL;
if (!MONGO_URL) {
  throw new Error(
    "MongoDB connection string is not provided in the environment variables."
  );
}
const storage = new GridFsStorage({
  url: MONGO_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: { w: "majority" },
  },
  file: (request, file) => {
    const match = ["image/png", "image/jpg"];
    if (match.indexOf(file.mimetype) === -1) {
      return `${Date.now()}-file-${file.originalname}`;
    } else {
      return {
        bucketName: "photos", // Add a comma here
        filename: `${Date.now()}-file-${file.originalname}`, // Specify the filename property
      };
    }
  },
});

export default multer({ storage: storage });
