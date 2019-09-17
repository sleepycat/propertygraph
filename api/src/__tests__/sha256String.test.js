const { sha256String } = require('../sha256String')

describe('sha256String', () => {
  describe('given a string', () => {
    it('produces a sha256 hash', async () => {
      const hash = await sha256String('some data to hash')
      expect(hash).toEqual(
        '6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50',
      )
    })
  })
})
