const http = require('http');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');

function calculateDestinyNumber(name) {
  const chart = {
    A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8,
    I:1, J:2, K:3, L:4, M:5, N:6, O:7, P:8,
    Q:1, R:2, S:3, T:4, U:5, V:6, W:7, X:8,
    Y:1, Z:2
  };
  let sum = 0;
  name.toUpperCase().replace(/[^A-Z]/g, '').split('').forEach(letter => {
    sum += chart[letter] || 0;
  });

  while (sum > 9) {
    sum = sum.toString().split('').reduce((a, b) => a + parseInt(b), 0);
  }

  return sum;
}

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    });

  } else if (req.url === '/calculate' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const data = qs.parse(body);
      const name = data.name;
      const dob = data.dob;
      const contact = data.contact;

      const destinyNumber = calculateDestinyNumber(name);

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <head>
            <title>Result</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>
              body {
                background: linear-gradient(to right, #89f7fe, #66a6ff);
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
              }
              .result {
                background: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="result">
              <h2>Numerology Result</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>DOB:</strong> ${dob}</p>
              <p><strong>Contact:</strong> ${contact}</p>
              <h3>🔮 Destiny Number: ${destinyNumber}</h3>
              <a href="/" class="btn btn-primary mt-3">Go Back</a>
            </div>
          </body>
        </html>
      `);
    });

  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
