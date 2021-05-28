const http = require('http');
const fs = require('fs');


function handleServer(req, res) {
    const { url, method } = req;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Example</title></head>');
        res.write('<body><h1>Test</h1><a href="/form">form</a></body>')
        res.write('</html>');
        res.end();
    } else {
        res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
          <form action="/message" method="POST"><input type="text" name="text"></form>
        </body>
        </html>`);
        res.end();
    }

    if (url === '/message' && 'POST') {
        const body = [];
        
        req.on('data', (chunk) => {
            console.log('chunk', chunk)
            body.push(chunk)
        });

        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            console.log('parseBody12', parseBody)
            fs.writeFileSync('message.txt',  parseBody.split('=')[1])
        })
    }
}

const server = http.createServer(handleServer);

server.listen(3000);