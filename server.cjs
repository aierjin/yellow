const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { exec } = require('node:child_process');
const root = __dirname;
const basePort = Number(process.env.PORT || 8816);
const autoOpen = process.env.NO_OPEN !== '1';
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.glb':'model/gltf-binary','.gltf':'model/gltf+json','.fbx':'application/octet-stream','.txt':'text/plain; charset=utf-8','.mp3':'audio/mpeg'};

const server = http.createServer((req,res)=>{
  let url;
  try{url=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end();return;}
  const file=path.resolve(root,'.'+(url==='/'?'/index.html':url));
  const relative=path.relative(root,file);
  if(relative.startsWith('..')||path.isAbsolute(relative)){res.writeHead(403);res.end();return;}
  fs.readFile(file,(error,content)=>{
    if(error){res.writeHead(404);res.end('Not found');return;}
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(content);
  });
});

function openBrowser(url){
  if(!autoOpen) return;
  const command = process.platform === 'win32'
    ? `start "" "${url}"`
    : process.platform === 'darwin' ? `open "${url}"` : `xdg-open "${url}"`;
  exec(command, () => {});
}

let port = basePort;
let attempts = 0;
const host = process.env.HOST || '127.0.0.1';

server.on('error', error => {
  if(error.code === 'EADDRINUSE' && attempts < 12){
    attempts += 1;
    port += 1;
    server.listen(port, host);
    return;
  }
  console.error('服务启动失败：' + error.message);
  process.exit(1);
});

server.on('listening', () => {
  const url = 'http://localhost:' + port;
  console.log('');
  console.log('  Yellow · 本地游戏已启动');
  console.log('  ' + url);
  console.log('');
  console.log('  浏览器会自动打开。若没有打开，请手动复制上面的地址。');
  console.log('  关闭这个窗口即可停止服务。');
  console.log('');
  openBrowser(url);
});

server.listen(port, host);
