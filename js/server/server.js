const http = require('http')
const PORT = 8080

let usersArr = null

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Mrthods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    // POST
    if (req.method === 'POST' && req.url === '/dataUsers') {
        let body = ''
        console.log(req.method)

        req.on('data', chunk => {
            body += chunk.toString()
        });

        req.on('end', () => {
            try {
                const parseData = JSON.parse(body)
                usersArr = parseData
                if (typeof (parseData) != 'object') {
                    console.log('!arr')
                    res.writeHead(400, { 'Content-Type': 'application/json' })
                    res.end(JSON.stringify({ error: 'wait Array' }))
                }
                usersArr = parseData
                console.log(req.url)
                res.writeHead(200, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify(parseData))

            } catch (error) {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify({ error: 'error' }))
            }
        });

        return;
    } else if(req.method === 'POST' && req.url === '/gram'){
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        });
        req.on('end', ()=> {
            const newUser = JSON.parse(body) 
            newUser.id = usersArr.length + 1
            usersArr.push(newUser)
            // res.writeHead(201, { 'Content-Type': 'application/json' }) // ERROR
            return res.end(JSON.stringify(usersArr))
        })
    } else if (req.method === "GET") {
        if (usersArr) {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(usersArr))
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end('not objekt')
        }
    }

    res.end();
}).listen(PORT)
