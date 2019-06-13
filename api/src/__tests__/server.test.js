const request = require('supertest')
const { ArangoTools, dbNameFromFile } = require('arango-tools')
const fs = require('fs')
const { Server } = require('../server')

let name = dbNameFromFile(__filename)

const {
  PROPERTYGRAPH_DB_PASSWORD: rootPass,
  PROPERTYGRAPH_TEST_DB_URL: url,
} = process.env

let query, truncate, drop

describe('parse server', () => {
  beforeAll(async () => {
    let { migrate } = await ArangoTools({
      rootPass,
      url,
    })

    ;({ query, truncate, drop } = await migrate([
      {
        type: 'database',
        databaseName: name,
        users: [{ username: 'root', passwd: rootPass }],
      },
      {
        type: 'documentcollection',
        databaseName: name,
        name: 'emails',
      },
    ]))
  })

  afterAll(async () => await drop()) // eslint-disable-line
  afterEach(async () => await truncate()) // eslint-disable-line

  describe('/', () => {
    it('handles a post request', async () => {
      const response = await request(Server({ query })).get('/')
      expect(response.body).toEqual({ ok: 'yes' })
    })
  })

  describe('/graphql', () => {
    it('saves an email with an attachment', async () => {
      let app = await Server({ query })

      let response = await request(app)
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

      let results = await query`RETURN COUNT(emails)`
      let [count] = await results.all()

      expect(count).toEqual(1)

      expect(response.body).toEqual({
        data: { saveEmail: 'kitten.jpg' },
      })
    })
  })
})
