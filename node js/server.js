import http from "http";
const server = http.createServer((req,res)=>{
    res.write("HEllo my first node.js server is running")
    res.end()
})
server.listen(3000,()=>{
    console.log("server is running at http://localhost:3000")
})