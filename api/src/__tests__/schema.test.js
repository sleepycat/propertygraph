const {graphql} = require('graphql')
const { schema } = require('../schema')

describe('schema', () => {
  describe('Query.hello', () => {
    it('greets the world', async () => {
      const response = await graphql(schema, '{hello}')

      expect(response.data).toEqual({ hello: 'world' })
    })
  })
})

