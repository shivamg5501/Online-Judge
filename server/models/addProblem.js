import mongoose from 'mongoose';

const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true },
  explanation: { type: String },
});

const submissionSchema = new mongoose.Schema({
  status: { type: String, required: true },
  timestamp: { type: String, required: true },
});

const problemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  timeLimit: { type: String, required: true },
  memoryLimit: { type: String, required: true },
  testCases: { type: [testCaseSchema], required: true },
  submissions: { type: [submissionSchema] },
});

const AddProblem = mongoose.model('AllProblems', problemSchema);

export default AddProblem;
