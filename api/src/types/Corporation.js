const { GraphQLObjectType, GraphQLString } = require('graphql')

const Corporation = new GraphQLObjectType({
  name: 'Corporation',
  fields: {
    address: {
      type: GraphQLString,
    },
  },
})

module.exports.Corporation = Corporation
