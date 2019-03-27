const { createServer } = require('http')

createServer(require('./index')).listen(3000, console.log('listening on 3000'))
