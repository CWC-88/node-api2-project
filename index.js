const express = require('express')
const postRoute = require('./post/postroute')

const server = express();


server.use(express.json())

server.get('/', (req, res) => {
    res.json({query: req.query, params: req.params, headers: req.headers})
})

server.use('/api/posts', postRoute)

server.listen(4000, () => {
    console.log('server is listening')
})