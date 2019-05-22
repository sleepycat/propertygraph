var { GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql')
const { GraphQLUpload } = require('graphql-upload')

// eslint-disable-next-line
const streamToString = stream =>
  new Promise((resolve, reject) => {
    let data = ''
    stream
      .on('error', reject)
      .on('data', chunk => {
        data += chunk
      })
      .on('end', () => resolve(data))
  })

var query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    hello: { type: GraphQLString, resolve: () => 'world' },
  },
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    saveEmail: {
      description: 'Saves an email',
      type: GraphQLString,
      args: {
        attachment: {
          description: 'Email attachment',
          type: GraphQLUpload,
        },
      },
      async resolve(_root, { attachment }) {
        const {
          filename,
          _mimetype,
          _encoding,
          createReadStream,
        } = await attachment
        const _stream = createReadStream()
        // console.log(await streamToString(stream))
        return filename
      },
    },
  }),
})

var schema = new GraphQLSchema({ query, mutation })
module.exports.schema = schema
