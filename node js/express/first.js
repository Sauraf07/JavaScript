import express from 'express';
const app = express()
app.get('/search', (req, res) => {

  const name = req.query.name
  // Why req.query? → reads data after ? in URL

  res.send(`You searched for: ${name}`)
})
app.get("/",(req,res)=>{
    res.send("welcome to my express server!")
})
app.listen(3000,()=>{
    console.log("server is running on http://localhost:3000")
})