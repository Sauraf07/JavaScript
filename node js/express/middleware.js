import express from 'express'
const app = express()

app.use(express.json())

// Route 1: Home
app.get('/', (req, res) => {
  res.send("Home Page")
})

// Route 2: Get user by ID
app.get('/user/:id', (req, res) => {
  const id = req.params.id
  res.json({ message: `Fetching user ${id}` })
})

// Route 3: Search
app.get('/search', (req, res) => {
  const name = req.query.name
  res.json({ message: `Searching for ${name}` })
})

// Route 4: Create user
app.post('/user', (req, res) => {
  const { name, email } = req.body
  res.json({ 
    message: "User created!", 
    user: { name, email } 
  })
})

// Route 5: Update user
app.put('/user/:id', (req, res) => {
  const id = req.params.id
  const { name } = req.body
  res.json({ message: `User ${id} updated to ${name}` })
})

// Route 6: Delete user
app.delete('/user/:id', (req, res) => {
  const id = req.params.id
  res.json({ message: `User ${id} deleted!` })
})

app.listen(3000, () => console.log("Server on http://localhost:3000"))