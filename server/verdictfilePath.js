import fs from 'fs'
import path from 'path';

import {fileURLToPath} from 'url';
const __generateFile = fileURLToPath(import.meta.url);
import {v4 as uuid} from 'uuid';
const __dirname = path.dirname(__generateFile);
const dirCodes =path.join(__dirname,'verdict');
if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive:true});
}
// console.log(dirCodes);
const verdictfilePath=async(format,status) => {
  const jobId=uuid();
  const fileName=`${jobId}.txt`;
  const filePath=path.join(dirCodes,fileName);
  if(status){
    const existingContent = fs.readFileSync(format, 'utf8');
    fs.writeFileSync(filePath,existingContent);
  }
  else{
    fs.writeFileSync(filePath,format);
   }
  return filePath;
};
export default verdictfilePath;

