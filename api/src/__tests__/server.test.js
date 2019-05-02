const request = require('supertest')
const { Server } = require('../server')

describe('parse server', () => {
  describe('/', () => {
    it('handles a post request', async () => {
      const response = await request(Server()).get('/')

      expect(response.body).toEqual({ ok: 'yes' })
    })
  })
})
