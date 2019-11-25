const express = require('express')
const graphqlHTTP = require('express-graphql')
const { graphqlUploadExpress } = require('graphql-upload')
const { schema } = require('./schema')

module.exports.Server = function(context = {}) {
  const server = express()

  server.use(
    '/',
    graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
    graphqlHTTP({
      schema,
      graphiql: true,
      context,
    }),
  )

  server.get('/', (_req, res) => {
    res.json({ ok: 'yes' })
  })

  return server
}
