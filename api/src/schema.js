var { GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql')
var query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    hello: { type: GraphQLString, resolve: () => 'world' },
  },
})
var schema = new GraphQLSchema({ query })
module.exports.schema = schema
