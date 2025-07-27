const path = require('path');

module.exports = (req, res, next) => {
  const ext = path.extname(req.url).toLowerCase();
  
  switch (ext) {
    case '.js':
      res.setHeader('Content-Type', 'application/javascript');
      break;
    case '.css':
      res.setHeader('Content-Type', 'text/css');
      break;
    case '.html':
    case '.htm':
      res.setHeader('Content-Type', 'text/html');
      break;
    case '.json':
      res.setHeader('Content-Type', 'application/json');
      break;
    case '.png':
      res.setHeader('Content-Type', 'image/png');
      break;
    case '.jpg':
    case '.jpeg':
      res.setHeader('Content-Type', 'image/jpeg');
      break;
    case '.gif':
      res.setHeader('Content-Type', 'image/gif');
      break;
    case '.svg':
      res.setHeader('Content-Type', 'image/svg+xml');
      break;
    case '.ico':
      res.setHeader('Content-Type', 'image/x-icon');
      break;
    case '.pdf':
      res.setHeader('Content-Type', 'application/pdf');
      break;
  }
  
  next();
};