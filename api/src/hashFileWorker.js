const fs = require('fs')
const {
  workerData: { filePath, algorithm },
  parentPort,
} = require('worker_threads')

const crypto = require('crypto')
const hash = crypto.createHash(algorithm)

const fileStream = fs.createReadStream(filePath)

fileStream.pipe(hash)

hash.on('readable', () => {
  const data = hash.read()
  parentPort.postMessage(data.toString('hex'))
})
