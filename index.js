var express = require('express')
var cors = require('cors')
var app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

app.get('/', function (req, res) {
  res.send('server is running')
})

app.listen(port ,() => {
  console.log(`CORS-enabled web server listening on port:${port}`)
})