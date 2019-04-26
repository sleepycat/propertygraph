const request = require('supertest')
const { server } = require('../server')

describe('parse server', () => {
  describe('/', () => {
    it('handles a post request', async () => {
      const response = await request(server)
        .post('/')
        .send({ foo: 'bar' })

      expect(response.body).toEqual({ ok: 'yes' })
    })
  })
})
