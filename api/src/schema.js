const crypto = require('crypto')
var {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLSchema,
} = require('graphql')
const { GraphQLUpload } = require('graphql-upload')

const sha256Stream = stream => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256')

    hash.on('readable', () => {
      const data = hash.read()
      if (data) resolve(data.toString('hex'))
    })
    hash.on('error', reject)
    stream.pipe(hash)
  })
}

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
        sender: {
          description: 'the subject of the email',
          type: GraphQLString,
        },
        recipients: {
          description: 'the subject of the email',
          type: new GraphQLList(GraphQLString),
        },
        subject: {
          description: 'the subject of the email',
          type: GraphQLString,
        },
        html: {
          description: 'the HTML version of the body of the email',
          type: GraphQLString,
        },
        text: {
          description: 'the HTML version of the body of the email',
          type: GraphQLString,
        },
        attachment: {
          description: 'Email attachment',
          type: GraphQLUpload,
        },
      },
      async resolve(_root, args, { query }) {
        const { attachment, sender, recipients, ...email } = args

        const savedSenderResponse = await query`
					UPSERT {address: ${sender}}
						INSERT {address: ${sender}}
						UPDATE {address: ${sender}}
						IN emailAddresses
						RETURN NEW
				`
        const savedSender = await savedSenderResponse.next()

        const response = await query`INSERT ${email} INTO emailContents RETURN NEW`
        const savedEmail = await response.next()

        for (const recipient of recipients) {
          const savedRecipientResponse = await query`
					UPSERT {address: ${recipient}}
						INSERT {address: ${recipient}}
						UPDATE {address: ${recipient}}
						IN emailAddresses
						RETURN NEW
				`
          const savedRecipient = await savedRecipientResponse.next()

          try {
            await query`INSERT {_from: ${savedSender._id}, _to: ${savedRecipient._id}, content: ${savedEmail._id}} INTO communications`
          } catch (e) {
            console.log('saving communication edge failed: ', e.message)
          }
        }

        if (attachment) {
          const {
            filename,
            _mimetype,
            _encoding,
            createReadStream,
          } = await attachment

          try {
            console.log(filename, ':', await sha256Stream(createReadStream()))
          } catch (e) {
            console.error('hashing failed!', e.message)
          }
        }

        return 'saved'
      },
    },
  }),
})

module.exports.schema = new GraphQLSchema({ query, mutation })
