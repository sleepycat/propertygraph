const { Server } = require('./src/server')
const {
  PORT = 3000,
  PROPERTYGRAPH_DB_PASSWORD: rootPass,
  PROPERTYGRAPH_TEST_DB_URL: url,
} = process.env


Server().listen(PORT, err => {
  if (err) throw err
  // eslint-disable-next-line no-console
  console.log(`🚀 API listening on port ${PORT}`)
})
