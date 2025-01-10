import express from "express";
import AddProblem from "../models/addProblem.js";

const problemNameRouter = express.Router();

problemNameRouter.get("/problem", async (req, res) => {
  try {
    const problems = await AddProblem.find({});
    const transformedProblems = problems.map(problem => ({
      id: problem._id,
      name: problem.name,
      difficulty: problem.difficulty || 'Unknown',
      category: 'General', // Set a default or fetch from DB if available
      timeLimit: problem.timeLimit,
      successRate: 'N/A', // Calculate success rate if implemented
      description: problem.description,
    }));
    return res.status(200).json({ data: transformedProblems });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch names.' });
  }
});

export default problemNameRouter;
