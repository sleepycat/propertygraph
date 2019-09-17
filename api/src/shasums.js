const { Worker } = require('worker_threads')

module.exports.sha256sum = function sha256sum(filePath) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(require.resolve('./hashFileWorker.js'), {
      workerData: { filePath, algorithm: 'sha256' },
    })
    worker.on('message', resolve)
    worker.on('error', reject)
    worker.on('exit', code => {
      if (code !== 0)
        reject(new Error(`sha256sum worker exited with code ${code}`))
    })
  })
}
