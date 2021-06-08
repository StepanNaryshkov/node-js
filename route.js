const users = ['lol'];

function handleServer(req, res) {
  const { url, method } = req;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Example</title></head>');
    res.write('<body><h1>Test</h1><a href="/create-user">form</a></body>')
    res.write('</html>');
    res.end();
  } else if (url === '/create-user' && method === 'GET'){
    res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
          <form action="/create-user" method="POST"><input type="text" name="username"></form>
          <a href="/users">users</a>
        </body>
        </html>`);
    return res.end();
  } else if (url === '/users'){
    res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
        <ul>`);
    users.map(user => res.write(`<li>${user}</li>`))
    res.write(`               
        </ul>
        </body>
        </html>`)
    res.end();
  }

  if (url === '/create-user' && method === 'POST') {
    const body = [];

    req.on('data', (chunk) => {
      body.push(chunk)
    });
    console.log('lol')
    req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const el = parseBody.split('=')[1];
      users.push(el);
    })
    res.statusCode = 302;
    res.setHeader('Location', '/users');
    res.end();
  }
}

module.exports = handleServer;
