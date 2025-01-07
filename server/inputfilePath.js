import fs from 'fs'
import path from 'path';
import {fileURLToPath} from 'url';
const __inputPath = fileURLToPath(import.meta.url);
import {v4 as uuid} from 'uuid';
const __dirname = path.dirname(__inputPath);
const dirCodes =path.join(__dirname,'input_file');
if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive:true});
}
// console.log(dirCodes);
const inputfilePath=async(format) => {
  const jobId=uuid();
  const fileName=`${jobId}.txt`
  const filePath=path.join(dirCodes,fileName);
  fs.writeFileSync(filePath,format);
  fs.writeFileSync(filePath,format);
  return filePath;
};
export default inputfilePath;