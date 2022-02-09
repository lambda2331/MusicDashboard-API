const app = require('./src/app')
const config = require('config')
const host = config.get('host')
const port = config.get('port')

app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`)
})
