import express from "express";
import Submission from "../models/addProblem.js";

const problemNameRouter = express.Router();

problemNameRouter.get("/problem", async (req, res) => {
  try {
    const submissions = await Submission.find({});
    const problemData = submissions.map((submission) => ({
      id: submission._id,
      name: submission.name,
    }));
    res.json(problemData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch names.' });
  }
});

export default problemNameRouter;
