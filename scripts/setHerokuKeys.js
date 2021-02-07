const keys = require('../src/server/keys.json')
const {exec} = require('child_process')

let command = 'heroku config:set'

Object.keys(keys.prod).forEach(key => {
  command += ` ${key}=${keys.prod[key]}`
})

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.log(`${error.message}`)

    return
  }
  if (stderr) {
    console.log(`${stderr}`)

    return
  }
})

