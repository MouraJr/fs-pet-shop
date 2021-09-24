var express = require('express')
var morgan = require('morgan')

var app = express()

// Logger Middleware
app.use(morgan('combined'))

// Body Parser Middleware
app.use(express.json());

app.get('/', function (req, res) {
    res.send('hello, world!')
})

// Variable for PORT 500 if in development
const PORT = process.env.PORT || 8000;

// Listining Server Start
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));