'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const importDir = require('directory-import')

module.exports = async function (fastify, opts) {
  // This loads all schemas
  importDir(
    { importMethod: 'sync', directoryPath: 'schemas' }, 
    (moduleName, modulePath, moduleData) => {
      fastify.addSchema(moduleData)
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'controllers'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
