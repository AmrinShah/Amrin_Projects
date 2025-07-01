const http = require('http');
const fs = require('fs');
const url = require('url');
const QRCode = require('qrcode');

const PORT = 5000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && req.url === '/') {
        // Serve the input form
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>QR Code Generator</title>
                <style>
                    body {
                        font-family: 'Segoe UI', sans-serif;
                        background: #f0f2f5;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                    }
                    .box {
                        background: #fff;
                        padding: 30px 40px;
                        border-radius: 15px;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                        text-align: center;
                        width: 100%;
                        max-width: 400px;
                    }
                    input[type="text"] {
                        width: 90%;
                        padding: 10px;
                        margin-bottom: 15px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        font-size: 16px;
                    }
                    button {
                        padding: 10px 20px;
                        background-color: #007BFF;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        font-size: 16px;
                        cursor: pointer;
                    }
                    button:hover {
                        background-color: #0056b3;
                    }
                </style>
            </head>
            <body>
                <div class="box">
                    <h2>🔗 QR Code Generator</h2>
                    <form action="/generate" method="GET">
                        <input type="text" name="data" placeholder="Enter a URL or text" required />
                        <br />
                        <button type="submit">Generate QR Code</button>
                    </form>
                </div>
            </body>
            </html>
        `);
    }

    else if (parsedUrl.pathname === '/generate' && req.method === 'GET') {
        const data = parsedUrl.query.data;

        if (!data) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Invalid input');
            return;
        }

        const qrImagePath = './qrcode.png';

        QRCode.toFile(qrImagePath, data, (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error generating QR Code');
                return;
            }

            fs.readFile(qrImagePath, (err, imageData) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error loading QR Code');
                    return;
                }

                const base64Image = imageData.toString('base64');

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <title>QR Code Generated</title>
                        <style>
                            body {
                                font-family: 'Segoe UI', sans-serif;
                                background: #f0f2f5;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100vh;
                                margin: 0;
                            }
                            .box {
                                background: #fff;
                                padding: 30px 40px;
                                border-radius: 15px;
                                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                                text-align: center;
                                max-width: 400px;
                            }
                            img {
                                max-width: 250px;
                                margin-bottom: 20px;
                                border: 1px solid #ccc;
                                padding: 10px;
                                background: #fff;
                                border-radius: 10px;
                            }
                            a.button {
                                display: inline-block;
                                padding: 10px 20px;
                                margin: 10px;
                                background: #007BFF;
                                color: #fff;
                                text-decoration: none;
                                border-radius: 5px;
                                font-weight: bold;
                            }
                            a.button:hover {
                                background-color: #0056b3;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="box">
                            <h2>✅ QR Code Generated</h2>
                            <img src="data:image/png;base64,${base64Image}" alt="QR Code" />
                            <br />
                            <a class="button" href="/download" download>⬇️ Download QR Code</a>
                            <a class="button" href="/">Generate Another</a>
                        </div>
                    </body>
                    </html>
                `);
            });
        });
    }

    else if (parsedUrl.pathname === '/download' && req.method === 'GET') {
        const qrImagePath = './qrcode.png';
        fs.readFile(qrImagePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Failed to download QR code');
                return;
            }
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Disposition': 'attachment; filename="qrcode.png"'
            });
            res.end(data);
        });
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
