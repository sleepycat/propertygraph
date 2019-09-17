const { Worker } = require('worker_threads')

module.exports.sha256String = function sha256String(workerData) {
  if (typeof workerData !== 'string')
    throw new Error(
      `sha256String only hashes strings, but recieved ${workerData}`,
    )
  return new Promise((resolve, reject) => {
    const worker = new Worker(require.resolve('./stringHashingWorker.js'), {
      workerData,
    })
    worker.on('message', resolve)
    worker.on('error', reject)
    worker.on('exit', code => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`))
    })
  })
}
