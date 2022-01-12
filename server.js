const uptime = new Date(parseInt(process.env['TIMEUP']))

require('http').createServer((req, res) => res.end(`Days:${uptime.getDay},`)).listen(3000)
require('./dist/index.js')
