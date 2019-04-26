const express = require('express')
const bodyParser = require('body-parser')

const server = express()

server.use(bodyParser.json())
server.post('/', (req, res) => {
  console.dir(req.body)
  res.json({ ok: 'yes' })
})

module.exports.server = server
