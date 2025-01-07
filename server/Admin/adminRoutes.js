import express from 'express';
import inputfilePath from '../inputfilePath.js';
import generateFile from '../generateFile.js';
import executeCpp from '../executeCpp.js';
import verdictfilePath from '../verdictfilePath.js';
import Submission from '../models/addProblem.js';
// import verdictfilePath from '../verdictfilePath.js';
const router = express.Router();

router.get("/healthCheck",(req,res)=>{
    res.send("connected");
})

router.post("/addProblems",async(req,res)=>{
    // 1 -> Question 
    // 2->  testCases (for showing outside)
    // 3->  code of answer
    // 4->  input file for test case generation 
    // 5->  3+4-> vardict file
    const { name,description, testCase,language,code,inputFile } = req.body;
    const  status="admin";
    let  arrysOfconstesProblemId=[];
    const filePath=generateFile(language,code);   // codeFile generated
    const inputFilePath= await inputfilePath(inputFile);   //code
    const outputFilePath= await executeCpp(filePath, inputFilePath,language);
    const verdictFilePath=await verdictfilePath(outputFilePath,"admin");
    const submission = new Submission({
        name: name,
        description: description,
        inputFile: inputFilePath,
        verdictFile: verdictFilePath,
        status: "hidden",
        testCase: testCase
      });
    
      // Save the submission to the database
      submission.save((error, savedSubmission) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Error saving submission");
        }
        arrysOfconstesProblemId.push(savedSubmission._id);
      });
    // const inputFilePath;

})
export default router;