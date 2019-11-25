const express = require('express')
const graphqlHTTP = require('express-graphql')
const { graphqlUploadExpress } = require('graphql-upload')
const { schema } = require('./schema')

module.exports.Server = function(context = {}) {
  const server = express()

  server.get('/alive', (_req, res) => {
    res.json({ ok: 'yes' })
  })

  server.get('/ready', (_req, res) => {
    res.json({ ok: 'yes' })
  })

  server.use(
    '/',
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
    graphqlHTTP({
      schema,
      graphiql: true,
      context,
    }),
  )


  return server
}
