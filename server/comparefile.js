import { promises as fsPromises } from "fs";
import crypto from "crypto";

// Function to calculate the MD5 hash of a file
async function calculateFileMD5(filePath) {
  try {
    const fileData = await fsPromises.readFile(filePath, "utf8");
    console.log(fileData);
    const md5Hash = crypto.createHash("md5").update(fileData).digest("hex");
    return md5Hash;
  } catch (error) {
    throw new Error(
      `Error reading file or calculating MD10  and hash: ${error.message}`
    );
  }
}

// Function to compare two files based on their MD5 hashes
async function compareFiles(verdictFilePath, generatedCodeFilePath) {
  try {
    const verdictMD5 = await calculateFileMD5(verdictFilePath);
    const generatedCodeMD5 = await calculateFileMD5(generatedCodeFilePath);
    console.log(verdictFilePath);
    console.log(generatedCodeFilePath);
    console.log("Verdict File MD5:", verdictMD5);
    console.log("Generated Code File MD5:", generatedCodeMD5);

    return verdictMD5 === generatedCodeMD5;
  } catch (error) {
    throw new Error(`Error comparing files: ${error.message}`);
  }
}

// Export the compareFiles function to be used in other files
export { compareFiles };
