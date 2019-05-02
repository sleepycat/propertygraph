const { server } = require('./src/server')
const { PORT = 3000 } = process.env

server.listen(PORT, err => {
  if (err) throw err
  // eslint-disable-next-line no-console
  console.log(`🚀 API listening on port ${PORT}`)
})
