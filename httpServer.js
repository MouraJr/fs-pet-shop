const { createServer } = require('http');
const { readFile, writeFile } = require('fs/promises');
const { match } = require('assert');

// Create a local server to receive data from
const server = createServer(async (req, res) => {
    const string = await readFile('./pets.json', 'utf8');

    // Get URL parts
    const url = new URL(req.url, `http://${req.headers.host}`);
    const data = JSON.parse(string);
    const methodReq = req.method;

    const gettingIndex = () => {
        const petRegExp = /^\/pets\/(.*)$/;
        const matches = req.url.match(petRegExp);
        return index = Number(matches[1]);
    };

    const allPets = () => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(`${string}`);
        res.end();
    };

    const noUrl = () => {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end('Not Found')
    }

    switch (methodReq) {
        case 'GET':
            if (url.pathname === '/pets') {
                allPets()
            } else if (url.pathname === '/') {
                noUrl();
            } else {
                gettingIndex()
                if (index < data.length && index >= 0) {
                    let getPet = data[index]
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.write(`${JSON.stringify(getPet)}`);
                    res.end();
                } else {
                    noUrl();
                }
            }
            break;
        case 'POST':
            console.log(url)
            break;
        default:
            console.error('Invalid Method')
            return exit(1)
    }

    // if (methodReq === 'POST') {
    //     console.log(url)
    // }

    // if (methodReq === 'GET' && url.pathname === '/pets') {
    //     allPets()
    // } else if (url.pathname === '/' && methodReq === 'GET') {
    //     noUrl();
    // } else {
    //     gettingIndex()
    //     if (index < data.length && index >= 0 && methodReq === 'GET') {
    //         let getPet = data[index]
    //         res.writeHead(200, { "Content-Type": "application/json" });
    //         res.write(`${JSON.stringify(getPet)}`);
    //         res.end();
    //     } else {
    //         noUrl();
    //     }
    // }

});

server.listen(8000);
module.exports = server;