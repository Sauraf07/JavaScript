// :id is a dynamic value in URL
app.get('/user/:id', (req, res) => {

  const id = req.params.id
  // Why req.params? → captures values from the URL

  res.send(`You requested user with ID: ${id}`)
})