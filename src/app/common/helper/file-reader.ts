// import * as fs from 'fs';
// import { promisify } from 'util';
// const readFile = promisify(fs.readFile);
// const array: Map<string, string> = new Map<string, string>();

// export async function readFileContent(filePath: string): Promise<string> {
//     let result = array.get(filePath);

//     if (!result) {
//         if (!fs.readFileSync(filePath)) {
//             throw { error: `file at '${filePath}' does not exists` };
//         }

//         const fileContent = await readFile(filePath, 'utf8');

//         array.set(filePath, fileContent);
//         result = fileContent;
//         console.log('loading file from : ', filePath);
//     } else {
//         console.log('file is loaded from cache : ', filePath);
//     }

//     return new Promise<string>((resolve, reject) => {
//         resolve(result);
//     });
// }
