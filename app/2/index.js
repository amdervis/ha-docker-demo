import http from 'http';
import { v4 as uuidv4 } from 'uuid';

const hostname = '0.0.0.0';
const port = 80;

const server = http.createServer((req, res) => {
  const uuid = uuidv4();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Web Server 2</title>
      </head>
      <body>
        <h1>Hello from Web Server 2!</h1>
        <h3>System UUID: ${uuid}</h3>
      </body>
    </html>
  `);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});