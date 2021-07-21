const fp = require('fastify-plugin')

module.exports = fp(async (fastify, opts) => {
    fastify.register(require('fastify-cors'), {
        origin: process.env.CLIENT_URL,
        methods: ['POST', 'PATCH', 'GET', 'DELETE'],
        credentials: true,
    })
})