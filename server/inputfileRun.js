import fs from 'fs'
import path from 'path';
import SubmitedProblem from './models/problemSbmitUser.js';
import {fileURLToPath} from 'url';
const __inputFileRun = fileURLToPath(import.meta.url);
import {v4 as uuid} from 'uuid';
const __dirname = path.dirname(__inputFileRun);
const dirCodes =path.join(__dirname,'inputFileRun');
if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive:true});
}
// console.log(dirCodes);
const inputFileRun=async(content) => {
  const format="txt";
  const jobId=uuid();
  const fileName=`${jobId}.${format}`;
  const filePath=path.join(dirCodes,fileName);
  fs.writeFileSync(filePath,content);
  await fs.writeFileSync(filePath,content);
  return filePath;
};
export default inputFileRun;

