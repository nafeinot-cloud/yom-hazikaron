// Temporary local HTTP server: accepts a raw PNG POST body at
// /icon/<filename> and writes it straight into public/. Used once to get
// the browser's canvas-rasterized icons onto disk (no native image libs
// needed — see scripts/README note). Safe to delete after icons exist.
import http from 'http';
import { writeFileSync } from 'fs';

const PORT = 8877;
const PUBLIC_DIR = new URL('../public/', import.meta.url);

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  if (req.method !== 'POST' || !req.url.startsWith('/icon/')) {
    res.writeHead(404);
    res.end();
    return;
  }
  const filename = decodeURIComponent(req.url.slice('/icon/'.length));
  const chunks = [];
  req.on('data', (c) => chunks.push(c));
  req.on('end', () => {
    const buf = Buffer.concat(chunks);
    writeFileSync(new URL(filename, PUBLIC_DIR), buf);
    console.log('wrote', filename, buf.length, 'bytes');
    res.writeHead(200);
    res.end('ok');
  });
});

server.listen(PORT, () => console.log(`icon receiver listening on http://localhost:${PORT}`));
