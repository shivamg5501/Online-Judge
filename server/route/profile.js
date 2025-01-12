import express from "express";
import User from "../models/users.js";
import jwt from "jsonwebtoken";

const Profile = express.Router();
const SECRET_KEY = "NOTESAPI";

// Middleware to verify JWT token and extract user ID
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// Get Profile Details
Profile.get("/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId, "-password"); // Exclude password field
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log('user',user);
    res.status(200).json({ profile: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// Update Profile
Profile.put("/profile", authenticate, async (req, res) => {
    const { name, gender, imageUrl, bio } = req.body;
    console.log("from server",req.body);
  
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update only the fields provided in the request
      if (name !== undefined) user.name = name;
      if (gender !== undefined) user.gender = gender;
      if (imageUrl !== undefined) user.imageUrl = imageUrl;
      if (bio !== undefined) user.bio = bio;
  
      const updatedUser = await user.save();
  
      console.log("User after update:", updatedUser);

      res.status(200).json({
        message: "Profile updated successfully",
        profile: updatedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating profile" });
    }
  });
  

  // Increment Problems Solved
  Profile.post("/incrementProblems", authenticate, async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.problemsSolved += 1;
      await user.save();
  
      res.status(200).json({ message: "Problems solved count updated", problemsSolved: user.problemsSolved });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating problems solved count" });
    }
  });
  
  
export default Profile;
