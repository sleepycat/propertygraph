const express = require('express')
const multer = require('multer')

const server = express()

server.use(multer().any())

server.post('/', (req, res) => {
  console.log('to: ',req.body.to)
  console.log('from: ',req.body.from)
  console.log('subject: ', req.body.subject)
  console.log('text: ', req.body.text)
  console.log('everything: ', req.body)
  res.json({ ok: 'yes' })
})

module.exports.server = server
