import http from 'http'

const server = http.createServer((req, res) => {

  // req.url → tells us what page user is visiting
  if(req.url === '/') {
    res.write("Welcome to Home Page!")
    res.end()
  } 
  else if(req.url === '/about') {
    res.write("This is About Page!")
    res.end()
  }
  else if(req.url === '/contact') {
    res.write("This is Contact Page!")
    res.end()
  }
  else {
    res.write("404 - Page Not Found!")
    res.end()
  }
})

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000")
})