import express from "express";
import generateFile from "../generateFile.js";
import executeCpp from "../executeCpp.js";
import { compareFiles } from "../comparefile.js";
import submissionSchema from "../models/addProblem.js";
import SubmitedProblem from "../models/problemSbmitUser.js";

const coderunRoute = express.Router();

coderunRoute.post("/problem/submit/:id", async (req, res) => {
  const userId = req.userId; // Access the user ID from the req object
  console.log(userId);
  const finding = await submissionSchema.findById(req.params.id);
  console.log(finding);

  const inputFile = await finding.inputFile;
  console.log("inputfile", inputFile);
  const verdictFile = await finding.verdictFile;
  console.log("USER ID =", userId);
  const { language, code } = req.body;
  if (code === undefined) {
    return res.status(400).json({ message: "empty code" });
  }

  try {
    const filePath = await generateFile(language, code);
    const output = await executeCpp(filePath, inputFile, language);
    const compare = await compareFiles(verdictFile, output);

    let status;
    if (compare) {
      status = "Accepted";
    } else {
      status = "Rejected";
    }

    const result = await SubmitedProblem.create({
      id: req.params.id,
      path: output,
      status: status,
      UserID: userId,
    });

    return res.status(200).json({ message: status });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default coderunRoute;
