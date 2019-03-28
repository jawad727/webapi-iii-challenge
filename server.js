const express = require('express');
const userRouter = require('./Routers/user-router');
const postRouter = require('./Routers/post-router');const server = express();

//custom middleware
function toCap(req, res, next) {
    req.body.name = req.body.name.toUpperCase();
    next();
}

//middleware
server.use(express.json());



//sanity check
server.get('/', (req, res) => {
    res.send(`
        <h2>Working</h2>
    `);
});

//Routes
server.use('/api/posts' ,postRouter)
server.use('/api/users' ,userRouter)


module.exports = server
