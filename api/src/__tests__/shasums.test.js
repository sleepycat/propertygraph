const { sha256sum } = require('../shasums')

describe('sha256sum', () => {
  describe('given a valid file path', () => {
    it('hashes the file content', async () => {
      await expect(
        sha256sum('./src/__tests__/testData/kitten.jpg'),
      ).resolves.toEqual(
        'f9b3df08e6cb37d2b63f092572ab9d7ac5ff54a0a4f109da3692ce026828146e',
      )
    })

    it('hashes zero byte files', async () => {
      await expect(
        sha256sum('./src/__tests__/testData/zerobytefile'),
      ).resolves.toEqual(
        'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      )
    })
  })

  describe('given a path that does not exist', () => {
    it(`returns a rejected promise if the file doesn't exist`, async () => {
      await expect(sha256sum('does-not-exist')).rejects.toEqual({
        code: 'ENOENT',
        errno: -2,
        path: 'does-not-exist',
        syscall: 'open',
      })
    })
  })
})
