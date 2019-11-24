const { ArangoTools } = require('arango-tools')
const { Server } = require('./src/server')
const { makeMigrations } = require('./migrations')
const {
  PORT = 3000,
  PROPERTYGRAPH_DB_PASSWORD: rootPass,
  PROPERTYGRAPH_DB_URL: url,
} = process.env

;(async () => {
  const { migrate } = await ArangoTools({ rootPass, url })
  const { query } = await migrate(
    makeMigrations({ databaseName: 'propertygraph', rootPass }),
  )

  Server({ query }).listen(PORT, err => {
    if (err) throw err
    // eslint-disable-next-line no-console
    console.log(`🚀 API listening on port ${PORT}`)
  })
})()
