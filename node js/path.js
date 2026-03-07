import path from 'path';
const myPath = "C:\Users\SAURAF KUMAR\Desktop\JS\node js\hello.txt"
console.log("File name",path.basename(myPath))
console.log("Folder name",path.dirname(myPath))
console.log("extention",path.extname(myPath))