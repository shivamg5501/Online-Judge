import mongoose from 'mongoose';
const TestCaseSchema = new mongoose.Schema({
  input: String,
  expectedOutput: String,
});
const SubmissionSchema = new mongoose.Schema({
  name: String,
  description: String,
  inputFile: String,
  verdictFile: String,
  status: String,
  testCases: [TestCaseSchema], 
});
const Submission = new mongoose.model('Submission', SubmissionSchema);
export default Submission;