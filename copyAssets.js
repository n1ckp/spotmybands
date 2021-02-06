const fs = require('fs-extra')
const path = require('path')

const SRC_DIR = path.resolve(__dirname, 'src')
const SERVER_DIR = path.resolve(SRC_DIR, 'server')
const CLIENT_DIR = path.resolve(SRC_DIR, 'client')

const VIEWS_DIR = path.resolve(SERVER_DIR, 'views')
const IMAGES_DIR = path.resolve(CLIENT_DIR, 'images')

const BUILD_DIR = path.resolve(__dirname, 'built')
const SERVER_BUILD_DIR = path.resolve(BUILD_DIR, 'server')
const CLIENT_BUILD_DIR = path.resolve(BUILD_DIR, 'client')

try {
  fs.copySync(VIEWS_DIR, path.resolve(SERVER_BUILD_DIR, 'views'))
  console.log('Views copied successfully.')
}
catch (err) {
  console.error(err)
}

try {
  fs.copySync(IMAGES_DIR, path.resolve(CLIENT_BUILD_DIR, 'images'))
  console.log('Images copied successfully.')
}
catch (err) {
  console.error(err)
}
