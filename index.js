// code away!
require('dotenv').config()
const server = require('./server')

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`\n*** server running on http://localhost:${port} ***\n`)
});