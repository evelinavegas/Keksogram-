const http = require('http')
const PORT = 8080

let savedObj = null

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Mrthods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    // POST
    if (req.method === 'POST') {
        let body = ''
        console.log(req.method)

        req.on('data', chunk => {
            body += chunk.toString()
        });

        req.on('end', () => {
            try {
                const parseData = JSON.parse(body)
                savedObj = parseData
                if (!Array.isArray(parseData)) {
                    console.log('!arr')
                    res.writeHead(400, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ error: 'wait Array' }))
                }

                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(parseData))

            } catch (error) {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify({ error: 'error' }))
            }
        });

        return;
    }
    else if(req.method=== "GET"){
        if(savedObj) {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(savedObj))
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end('not objekt')
        }
    }

    res.end();
}).listen(PORT)
