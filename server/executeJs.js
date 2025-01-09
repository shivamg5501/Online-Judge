import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const outputPath = path.join(__dirname, 'output');
const outputFilePath = path.join(__dirname, 'output_file');

// Ensure output directories exist
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

if (!fs.existsSync(outputFilePath)) {
    fs.mkdirSync(outputFilePath, { recursive: true });
}

const executeJs = (filepath, inputPath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outputPath = path.join(__dirname, `output_file/`);

    return new Promise((resolve, reject) => {
        // Read the input file
        fs.readFile(inputPath, 'utf8', (inputErr, inputData) => {
            if (inputErr) {
                reject(inputErr);
                return;
            }

            // Read the code file
            fs.readFile(filepath, 'utf8', (codeErr, code) => {
                if (codeErr) {
                    reject(codeErr);
                    return;
                }

                // Create execution wrapper
                const wrappedCode = `
                    let output = '';
                    const input = \`${inputData}\`.split('\\n');
                    let inputIndex = 0;

                    // Override console.log
                    const originalConsoleLog = console.log;
                    console.log = function() {
                        output += Array.from(arguments).join(' ') + '\\n';
                        originalConsoleLog.apply(console, arguments);
                    };

                    // Provide readline function
                    function readline() {
                        return input[inputIndex++] || '';
                    }

                    try {
                        // Execute user code
                        ${code}

                        // Write output to file
                        require('fs').writeFileSync('${outputPath.replace(/\\/g, '\\\\')}', output);
                    } catch (error) {
                        console.error(error);
                        process.exit(1);
                    }
                `;

                // Write temporary execution file
                const tempFile = path.join(outputPath, `${jobId}.js`);
                fs.writeFile(tempFile, wrappedCode, (writeErr) => {
                    if (writeErr) {
                        reject(writeErr);
                        return;
                    }

                    // Execute the code
                    exec(`node '${filepath}`, { timeout: 5000 }, (error, stdout, stderr) => {
                        // Cleanup temp file
                        fs.unlink(tempFile, () => {});

                        if (error) {
                            reject({ error, stderr });
                            return;
                        }
                        
                        resolve(outputPath);
                    });
                });
            });
        });
    });
};

export default executeJs;