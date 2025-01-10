import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], default: "Other" },
  imageUrl: { type: String, default: null }, // URL for profile image
  problemsSolved: { type: Number, default: 0 }, // Number of problems solved
  bio: { type: String, default: "" }, // Optional bio
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

export default User;
