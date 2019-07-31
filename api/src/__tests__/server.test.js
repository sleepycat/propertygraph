const { parse } = require('path')
const request = require('supertest')
const { Database, aql } = require('arangojs')
const fs = require('fs')
const { Server } = require('../server')

const generateName = () =>
  parse(__filename).base.replace(/\./g, '_') + '_' + Date.now()

const {
  PROPERTYGRAPH_DB_PASSWORD: rootPass,
  PROPERTYGRAPH_TEST_DB_URL: url,
} = process.env

let sys

describe('parse server', () => {
  beforeEach(async () => {
    sys = new Database({ url })
    sys.useDatabase('_system')
    sys.useBasicAuth('root', rootPass)
  })

  describe('/', () => {
    it('handles a post request', async () => {
      const name = generateName()
      await sys.createDatabase(name)
      const db = new Database({ url })
      db.useDatabase(name)
      db.useBasicAuth('root', rootPass)
      const emails = db.collection('emails')
      await emails.create()

      const query = (strings, ...vars) => db.query(aql(strings, ...vars))

      const response = await request(Server({ query })).get('/')
      expect(response.body).toEqual({ ok: 'yes' })
      await sys.dropDatabase(name)
    })
  })

  describe('/graphql', () => {
    it('saves an email with an attachment', async () => {
      const name = generateName()
      await sys.createDatabase(name)
      const db = new Database({ url })
      db.useDatabase(name)
      db.useBasicAuth('root', rootPass)
      const emails = db.collection('emails')
      await emails.create()

      const query = (strings, ...vars) => db.query(aql(strings, ...vars))
      const app = await Server({ query })

      const response = await request(app)
        .post('/graphql')
        .field(
          'operations',
          JSON.stringify({
            query: `
              mutation(
                $sender: String
                $recipients: [String]
                $subject: String
                $text: String
                $html: String
                $attachment: Upload
              ) {
                saveEmail(
                  sender: $sender
                  recipients: $recipients
                  subject: $subject
                  text: $text
                  html: $html
                  attachment: $attachment
                )
              }
            `,
            variables: {
              sender: 'a@example.com',
              recipients: ['b@example.com', 'c@example.com'],
              subject: 'my kitten',
              text: 'This is my kitten. Look at him.',
              html: '<p>This is my kitten. Look at him.</p>',
            },
          }),
        )
        .field('map', '{ "0": ["variables.attachment"] }')
        .field('0', fs.createReadStream('./src/__tests__/testData/kitten.jpg'))

      const results = await query`RETURN COUNT(emails)`
      const [count] = await results.all()

      expect(count).toEqual(1)

      expect(response.body).toEqual({
        data: { saveEmail: 'kitten.jpg' },
      })

      await sys.dropDatabase(name)
    })
  })
})
