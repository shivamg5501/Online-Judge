import express from 'express';
const ProblemidRouter = express.Router();
import Submission from '../models/addProblem.js';

ProblemidRouter.get('/problem/:id', async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'No submission found for the given ID.' });
    }

    const { name, description, testCases } = submission;
    if (!testCases || testCases.length === 0) {
      return res.status(404).json({ message: 'No test cases found for the problem.' });
    }

    const problemData = {
      name: name,
      description: description,
      testCases: testCases // Include the test cases in the response
    };

    res.json(problemData);
  } catch (error) {
    console.error('Error fetching problem data:', error.message);
    res.status(500).json({ message: 'Failed to fetch problem data.' });
  }
});

export default ProblemidRouter;
