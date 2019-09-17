const { workerData, parentPort } = require('worker_threads')

const crypto = require('crypto')
const hash = crypto.createHash('sha256')

hash.on('readable', () => {
  // Only one element is going to be produced by the
  // hash stream.
  const data = hash.read()
  if (data) {
    parentPort.postMessage(data.toString('hex'))
  }
})

hash.write(workerData)
hash.end()
