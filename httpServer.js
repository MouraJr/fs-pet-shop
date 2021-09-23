const http = require('http');
const { readFile, writeFile } = require('fs/promises');
const { readFunction } = require('./pets')

// Create a local server to receive data from
const server = http.createServer((req, res) => {
    if (req === '/pets') {
        readFunction()
        res.end(JSON.stringify({ data }));
    }
});

server.listen(8000);