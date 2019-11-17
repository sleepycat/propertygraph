const { ArangoTools } = require('arango-tools')
const { Server } = require('./src/server')
const {
  PORT = 3000,
  PROPERTYGRAPH_DB_PASSWORD: rootPass,
  PROPERTYGRAPH_TEST_DB_URL: url,
} = process.env

const databaseName = 'propertygraph'

;(async () => {
  const { migrate } = await ArangoTools({ rootPass, url })
  const { query } = await migrate([
    {
      type: 'database',
      databaseName,
      users: [{ username: 'root', passwd: rootPass }],
    },
    {
      type: 'documentcollection',
      databaseName,
      name: 'emailAddresses',
    },
    {
      type: 'documentcollection',
      databaseName,
      name: 'emailContents',
    },
    {
      type: 'edgecollection',
      databaseName,
      name: 'communications',
    },
  ])

  Server({ query }).listen(PORT, err => {
    if (err) throw err
    // eslint-disable-next-line no-console
    console.log(`🚀 API listening on port ${PORT}`)
  })
})()
