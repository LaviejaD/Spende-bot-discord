require('http').createServer((req, res) => res.end('Bot is alive!')).listen(3000)
require('/dist/index.js')