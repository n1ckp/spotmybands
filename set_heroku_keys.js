const keys = require('./keys.json')
const {exec} = require('child_process')

let command = 'heroku config:set'

Object.keys(keys.prod).forEach(key => {
  command += ` ${key}=${keys.prod[key]}`
})

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`)

    return
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`)

    return
  }
  console.log('Successfully set config keys for Heroku')
})

