import express from 'express';
import inputfilePath from '../inputfilePath.js';
import generateFile from '../generateFile.js';
import executeCpp from '../executeCpp.js';
import verdictfilePath from '../verdictfilePath.js';
import AddProblem from '../models/addProblem.js'; // Updated to match your model file name

const router = express.Router();

// Health check endpoint
router.get('/healthCheck', (req, res) => {
  console.log('Inside health check');
  return res.status(200).json({ message: 'Health check passed' });
});

// Add problems endpoint
router.post('/addProblems', async (req, res) => {
  console.log('Inside add problem');
  try {
    const { 
      name, 
      description, 
      difficulty, 
      timeLimit, 
      memoryLimit, 
      testCases, 
      submissions 
    } = req.body;

    // Validate required fields
    if (!name || !description || !difficulty || !timeLimit || !memoryLimit || !testCases || !Array.isArray(testCases)) {
      return res.status(400).json({ error: 'Missing or invalid required fields' });
    }

    // Create and save the problem
    const problem = new AddProblem({
      name,
      description,
      difficulty,
      timeLimit,
      memoryLimit,
      testCases,
      submissions: submissions || [], // Optional
    });

    const savedProblem = await problem.save();
    return res.status(201).json({ message: 'Problem added successfully', problem: savedProblem });
  } catch (error) {
    console.error('Error adding problem:', error);
    return res.status(500).json({ error: 'An error occurred while adding the problem' });
  }
});

export default router;
