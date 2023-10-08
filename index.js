const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/form') {
    if (req.method === 'GET') {
      // Show a simple HTTP form
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`
        <html>
          <head>
            <title>Simple Form</title>
          </head>
          <body>
            <h1>Simple Form</h1>
            <form method="POST" action="/form">
              <input type="text" name="message" placeholder="Enter your message">
              <input type="submit" value="Submit">
            </form>
          </body>
        </html>
      `);
      res.end();
    } else if (req.method === 'POST') {
      // Handle form submission and display form data
      let postData = '';
      req.on('data', (chunk) => {
        postData += chunk;
      });
      req.on('end', () => {
        const formData = querystring.parse(postData);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
          <html>
            <head>
              <title>Form Data</title>
            </head>
            <body>
              <h1>Form Data</h1>
              <p>Submitted Message: ${formData.message}</p>
            </body>
          </html>
        `);
        res.end();
      });
    }
  } else if (pathname === '/querystring') {
    // Decode and display querystring data
    const queryData = parsedUrl.query;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <html>
        <head>
          <title>Querystring Data</title>
        </head>
        <body>
          <h1>Querystring Data</h1>
          <p>Query Parameter: ${queryData.parameter || 'N/A'}</p>
        </body>
      </html>
    `);
    res.end();
  } else {
    // Handle other routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('Not Found');
    res.end();
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
