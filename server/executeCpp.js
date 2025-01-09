import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __executeCpp = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__executeCpp);

// Define output directories
const outputPath = path.join(__dirname, "output");
const outputFilePath = path.join(__dirname, "output_file");

// Ensure directories exist
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

if (!fs.existsSync(outputFilePath)) {
  fs.mkdirSync(outputFilePath, { recursive: true });
}

// Function to execute C++ code
const executeCpp = (filePath, inputPath) => {
  const jobId = path.basename(filePath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.exe`);
  const outputsPath = path.join(outputFilePath, `${jobId}.txt`);

  return new Promise((resolve, reject) => {
    const command = `g++ ${filePath} -o ${outPath} && ${outPath} < ${inputPath} > ${outputsPath}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject({ error, stderr });
      }
      if (stderr) {
        return reject(stderr);
      }
      resolve(outputsPath);
    });
  });
};

export default executeCpp;
