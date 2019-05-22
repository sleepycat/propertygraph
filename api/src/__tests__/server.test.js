const request = require('supertest')
const fs = require('fs')
const { Server } = require('../server')

describe('parse server', () => {
  describe('/', () => {
    it('handles a post request', async () => {
      const response = await request(Server()).get('/')

      expect(response.body).toEqual({ ok: 'yes' })
    })
  })

  describe('file uploading', () => {
    it('accepts a file', async () => {
      let app = await Server()

      // This is constructed according to the file uploading spec:
      // https://github.com/jaydenseric/graphql-multipart-request-spec
      let response = await request(app)
        .post('/graphql')
        .field(
          'operations',
          JSON.stringify({
            query: `
            mutation ($attachment: Upload) {
              saveEmail(attachment: $attachment)
            }
          `,
          }),
        )
        .field('map', '{ "0": ["variables.attachment"] }')
        .field('0', fs.createReadStream('./src/__tests__/testData/kitten.jpg'))

      expect(response.body).toEqual({
        data: { saveEmail: 'kitten.jpg' },
      })
    })
  })
})
