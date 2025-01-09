import express from 'express';
import generateFile from '../generateFile.js';
import executeCpp from '../executeCpp.js';
import inputFileRun from '../inputfileRun.js';
import fs from 'fs/promises'; // Import fs.promises for awaitable file operations
import { unlink } from 'fs'; // Import fs.unlink to delete files
import  executeJs  from '../executeJs.js';
import  executePy  from '../executePy.js';

const CoderunningRoute = express.Router();

CoderunningRoute.post("/problem/run", async (req, res) => {
  const { language, code, input } = req.body;
  // console.log(req.body);
  if (code === undefined) {
    return res.status(201).json({ message: "empty code" });
  }
  try {
    // console.log(input);
    const inputFile = await inputFileRun(input);
    // console.log(inputFile);

    const filePath = await generateFile(language, code);
    // console.log('filePath',filePath);
    let output;
    if(language=='cpp'){
      output = await executeCpp(filePath, inputFile,language);
      // console.log('cpp output', output);
    }
    if(language=='javascript'){
      output = await executeJs(filePath, inputFile,language);
    }
    if(language=='python'){
      output = await executePy(filePath,inputFile,language);
    }
    // console.log(output);
    const outputdataBuffer = await fs.readFile(output);
    // console.log("outputdataBuffer", outputdataBuffer);
    const outputdataString = outputdataBuffer.toString();

    // await fs.unlink(inputFile);
    // await fs.unlink(output);

    // console.log(outputdataString);
    return res.status(200).json({ outputData: outputdataString });
  }  catch (error) {
    console.error("Error in /problem/run route:", error);
    return res.status(500).json({ success: false, error: error.message });
    
}
});

export default CoderunningRoute;
