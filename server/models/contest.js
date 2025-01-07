import mongoose from "mongoose";
const testCaseSchema = new mongoose.Schema({
    input: String,
    expectedOutput: String,
});
const problemSchema = new mongoose.Schema({
    problemName: String,
    description: String,
    testCase:[testCaseSchema],
});
const contestSchema= new mongoose.Schema({
    name: String,
    dateAndTime: Date,
    numberOfProblems:Number,
    author: String,
    description:String,
    problem: [problemSchema]
})

const Contest = new mongoose.model('Contest',contestSchema);
export default Contest;


