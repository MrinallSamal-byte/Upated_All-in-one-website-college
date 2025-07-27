/**
 * MIME type utilities for serving files with correct content types
 */

// Map file extensions to MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.htm': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain',
  '.csv': 'text/csv',
  '.xml': 'application/xml',
  '.zip': 'application/zip',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav'
};

/**
 * Get MIME type for a file based on its extension
 * @param {string} path - File path
 * @returns {string} MIME type
 */
function getMimeType(path) {
  const extension = path.substring(path.lastIndexOf('.')).toLowerCase();
  return mimeTypes[extension] || 'application/octet-stream';
}

/**
 * Set correct MIME type headers for a response based on file path
 * @param {object} res - Express response object
 * @param {string} path - File path
 */
function setMimeTypeHeader(res, path) {
  res.setHeader('Content-Type', getMimeType(path));
}

module.exports = {
  getMimeType,
  setMimeTypeHeader
};