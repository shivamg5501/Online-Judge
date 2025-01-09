import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Common ES module setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const outputPath = path.join(__dirname, "output_file");
// const outputFilePath = path.join(outputPath, `${jobId}.txt`);

// Ensure output directory exists
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executePy = (filepath, inputPath) => {
  const jobId = path.basename(filepath).split(".")[0];
//   const outputPath = path.join(__dirname, "output_file");
  const outputFilePath = path.join(outputPath, `${jobId}.txt`);
  return new Promise((resolve, reject) => {
    exec(`py "${path.resolve(filepath)}"`, (error, stdout, stderr) => {
      console.log("Executed");
      console.log("Filepath and OutputPath:", filepath, outputFilePath);

      if (error) {
        console.error(`Execution Error: ${error.message}`);
        return reject(error);
      }

      if (stderr) {
        console.error(`Standard Error: ${stderr}`);
        return reject(stderr);
      }

      // Save the output to the file
      fs.writeFile(outputFilePath, stdout, (writeErr) => {
        if (writeErr) {
          console.error(`Error writing to file: ${writeErr.message}`);
          return reject(writeErr);
        } else {
          console.log(`Output saved to: ${outputFilePath}`);
          resolve(outputFilePath);
        }
      });
    });
  });
};

export default executePy;
