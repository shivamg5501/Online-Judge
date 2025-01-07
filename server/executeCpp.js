import { exec } from 'child_process';
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __executeCpp = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__executeCpp);
const outputPath = path.join(__dirname, 'output');
console.log(outputPath);
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}
function compareFiles(file1Path, file2Path) {
  return new Promise((resolve, reject) => {
    fs.readFile(file1Path, 'utf8', (err, data1) => {
      if (err) {
        reject(err);
        return;
      }

      fs.readFile(file2Path, 'utf8', (err, data2) => {
        if (err) {
          reject(err);
          return;
        }

        // Compare the contents of the two files
        const areFilesSame = data1 === data2;

        resolve(areFilesSame);
      });
    });
  });
}
const executeCpp = (filePath,inputPath) => {
  const jobId = path.basename(filePath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.exe`)
  // const inputPath = path.join(__dirname, './input_file/input.txt')
  const outputsPath = path.join(__dirname, `./output_file/${jobId}.txt`)
  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe < ${inputPath} > ${outputsPath} `,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(outputsPath);
      });
  });
}
export default executeCpp;
// docker
// import { exec, spawn } from 'child_process';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __executeCpp = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__executeCpp);
// const outputPath = path.join(__dirname, 'output');

// console.log(outputPath);

// if (!fs.existsSync(outputPath)) {
//   fs.mkdirSync(outputPath, { recursive: true });
// }

// const executeCpp = (filePath, inputPath,language) => {
//   const jobId = path.basename(filePath).split(".")[0];
//   const outputPath = path.join(__dirname, `./output_file/${jobId}.txt`);
//   console.log(outputPath);
//   let command = '';

//   if (language === 'cpp') {
//     const outPath = path.join(outputPath, `${jobId}.exe`);
//     command = `g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe < ${inputPath} > ${outputPath}`;
//   } else if (language === 'python') {
//     command = `python ${filePath} < ${inputPath} > ${outputPath}`;
//   }
//   return new Promise((resolve, reject) => {
//     // Compile the C++ program
//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         reject({ error, stderr });
//         return;
//       }

//       // Run the compiled executable
//       const executable = spawn(outPath, [], {
//         stdio: ['pipe', 'pipe', 'inherit'],
//         detached: true
//       });

//       // Pipe input from the input file
//       const inputStream = fs.createReadStream(inputPath);
//       inputStream.pipe(executable.stdin);

//       // Capture output from stdout
//       let capturedOutput = '';
//       executable.stdout.on('data', (data) => {
//         capturedOutput += data.toString();
//       });

//       // Handle execution completion
//       executable.on('close', (code) => {
//         fs.writeFileSync(outputsPath, capturedOutput);
//         resolve(outputsPath);
//       });
//     });
//   });
// };

// export default executeCpp;

