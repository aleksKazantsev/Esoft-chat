const fp = require('fastify-plugin')

module.exports = fp(async (fastify, opts) => {
    fastify.register(require('fastify-cookie'), {
      secret: process.env.COOKIE_SECRET,
      parseOptions: {}
    })
})