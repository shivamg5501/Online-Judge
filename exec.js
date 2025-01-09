const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// Path to the JavaScript file to execute
const jsFilePath = path.join(__dirname, "a.js");
const outputPath = path.join(__dirname, "output.txt");

// Execute the JS file using Node.js
exec(`node "${jsFilePath}"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Execution Error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`Standard Error: ${stderr}`);
    return;
  }

  // Save the output to the file
  fs.writeFile(outputPath, stdout, (writeErr) => {
    if (writeErr) {
      console.error(`Error writing to file: ${writeErr.message}`);
    } else {
      console.log(`Output saved to: ${outputPath}`);
    }
  });
});
