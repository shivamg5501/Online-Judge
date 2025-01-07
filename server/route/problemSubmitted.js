import express from 'express';
const ProblemSubmittedRouter = express.Router();
import SubmitedProblem from '../models/problemSbmitUser.js';

ProblemSubmittedRouter.get('/problem/:id/submission', async (req, res) => {
  try {
    const idToFind = req.params.id;

    // Find all documents that match the given id
    const submissions = await SubmitedProblem.find({ id: idToFind });

    if (submissions.length === 0) {
      return res.status(404).json({ message: 'No submission found for the given ID.' });
    }

    // Map the submissions to include only _id and status fields
    const problemData = submissions.map((submission) => ({
      _id: submission._id, // Include the MongoDB _id in the response
      status: submission.status, // Include the status in the response
    }));

    res.json(problemData);
  } catch (error) {
    console.error('Error fetching problem data:', error.message);
    res.status(500).json({ message: 'Failed to fetch problem data.' });
  }
});

export default ProblemSubmittedRouter;
