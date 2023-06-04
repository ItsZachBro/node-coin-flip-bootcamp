const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const fileExtension = path.extname(req.url);
  const mimeType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
  };

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
  } else if (mimeType[fileExtension]) {
    res.writeHead(200, { 'Content-Type': mimeType[fileExtension] });
    fs.createReadStream(path.join(__dirname, req.url)).pipe(res);
  } else if (req.url === '/coin-flip') {
    const result = Math.random() < 0.5 ? 'HEADS' : 'TAILS';
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ result }));
  } else {
    res.writeHead(404);
    res.end();
  }
});

const port = 2345;
server.listen(port, () => {
  console.log(`Go flip at ${port}`);
});



