const { ArangoTools, dbNameFromFile } = require('arango-tools')
const request = require('supertest')
const fs = require('fs')
const { Server } = require('../server')
const { makeMigrations } = require('../../migrations')

const {
  PROPERTYGRAPH_DB_PASSWORD: rootPass,
  PROPERTYGRAPH_TEST_DB_URL: url,
} = process.env

describe('parse server', () => {
  describe('/', () => {
    let query, drop, truncate, migrate

    beforeAll(async () => {
      ;({ migrate } = await ArangoTools({ rootPass, url }))
      ;({ query, drop, truncate } = await migrate(
        makeMigrations({ databaseName: dbNameFromFile(__filename), rootPass }),
      ))
    })

    beforeEach(async () => {
      await truncate()
    })

    afterAll(async () => {
      await drop()
    })

    it('handles a post request', async () => {
      const response = await request(Server({ query })).get('/')

      expect(response.body).toEqual({ ok: 'yes' })
    })
  })

  describe('/graphql', () => {
    let query, drop, truncate, migrate

    beforeAll(async () => {
      ;({ migrate } = await ArangoTools({ rootPass, url }))
      ;({ query, drop, truncate } = await migrate(
        makeMigrations({ databaseName: dbNameFromFile(__filename), rootPass }),
      ))
    })

    beforeEach(async () => {
      await truncate()
    })

    it('saves an email with an attachment', async () => {
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

      const results = await query`
				  RETURN COUNT(emailContents)
				`
      const [count] = await results.all()

      expect(count).toEqual(1)

      expect(response.body).toEqual({
        data: { saveEmail: 'saved' },
      })
      // drop our test db
      await drop()
    })
  })
})
