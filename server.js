

require('http').createServer((req, res) => res.end(`${process.env['TIMEUP']}`)).listen(3000)
require('./dist/index.js')
