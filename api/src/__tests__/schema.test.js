const { graphql } = require('graphql')
const { schema } = require('../schema')

describe('schema', () => {
  describe('Query.corporation', () => {
    describe('given an operating name', () => {
      it('returns the corporations address', async () => {
        const response = await graphql(
          schema,
          `
            {
              corporation(operatingName: "CCC364") {
                address
              }
            }
          `,
        )

        expect(response).toEqual({
          data: { corporation: { address: '100 Bruyere St' } },
        })
      })
    })
  })
})
