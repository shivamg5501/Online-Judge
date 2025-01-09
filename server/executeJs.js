import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const outputPath = path.join(__dirname, 'output');
const outputFilePath = path.join(outputPath, 'output_file');

const executeJs = (filepath, inputPath) => {
    const jobId = path.basename(filepath).split(".")[0];
    // const tempFile = path.join(outputFilePath, `${jobId}.js`);

    exec(`node '${filepath}'`, (error, stdout, stderr) => {
        console.log('executed');
        console.log("filepath and outputpath",filepath,outputFilePath);
        if (error) {
            console.error(`Execution Error: ${error.message}`);
            return;
        }
    
        if (stderr) {
            console.error(`Standard Error: ${stderr}`);
            return;
        }
    
        // Save the output to the file
        fs.writeFile(outputFilePath, stdout, (writeErr) => {
            if (writeErr) {
                console.error(`Error writing to file: ${writeErr.message}`);
            } else {
                console.log(`Output saved to: ${outputFilePath}`);
            }
        });
    });
};

export default executeJs;