const express = require('express')
const graphqlHTTP = require('express-graphql')
const { schema } = require('./schema')

module.exports.Server = function(context = {}) {
  const server = express()

  server.use(
    '/graphql',
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
