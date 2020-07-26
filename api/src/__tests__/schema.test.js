const { ArangoTools, dbNameFromFile } = require('arango-tools')
const { graphql } = require('graphql')
const { makeMigrations } = require('../../migrations')
const { schema } = require('../schema')

const {
  PROPERTYGRAPH_DB_PASSWORD: rootPass,
  PROPERTYGRAPH_DB_URL: url,
} = process.env

describe('schema', () => {
  describe('Query.corporation', () => {
    let query, drop, truncate, migrate, collections

    beforeAll(async () => {
      ;({ migrate } = await ArangoTools({ rootPass, url }))
      ;({ query, drop, truncate, collections } = await migrate(
        makeMigrations({ databaseName: dbNameFromFile(__filename), rootPass }),
      ))
    })

    beforeEach(async () => {
      await truncate()
    })

    afterAll(async () => {
      await drop()
    })

    describe('given an operating name', () => {
      beforeEach(async () => {
        await collections.corporations.save({
          operatingName: 'CCC364',
          address: '100 Bruyere St',
        })
      })

      afterEach(async () => {
        await truncate()
      })

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
          null,
          { query },
        )

        expect(response).toEqual({
          data: { corporation: { address: '100 Bruyere St' } },
        })
      })
    })
  })
})
