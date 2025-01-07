import express from 'express';
import Submission from '../models/addProblem.js';
import verdictfilePath from '../verdictfilePath.js';
import inputfilePath from '../inputfilePath.js';

const getInputFilerouter = express.Router();

getInputFilerouter.post('/submit', async (req, res) => {
  try {
    const { name, email, description, inputFile, verdictFile, testCases } = req.body;
    // console.log(name,email,description,inputFile);
    const inputFilePath = await inputfilePath(inputFile);
    const verdictFilePath = await verdictfilePath(verdictFile);
    console.log(inputFilePath);
    console.log(verdictFilePath);

    const testCasesArray = testCases.map(testCase => ({
      input: testCase.input,
      expectedOutput: testCase.expectedOutput,
    }));

    const newSubmission = new Submission({
      name: name,
      email: email,
      description: description,
      inputFile: inputFilePath,
      verdictFile: verdictFilePath,
      testCases: testCasesArray,
    });

    await newSubmission.save();
    return res.status(201).json({ message: 'Submission created successfully', Submission });
  } catch (error) {
    console.error('Error while submitting:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

export default getInputFilerouter;
