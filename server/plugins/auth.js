const fp = require('fastify-plugin')

module.exports = fp(async (fastify, opts) => {
    fastify
        .decorate('verifyJWTandLevel', async (request, reply) => {
            try {
                const authorizationHeader = request.headers.authorization
                if(!authorizationHeader) {
                    throw new Error('Пользователь не авторизован!')
                }

                
            } catch (e) {
                reply.code(401).send(e)
            }
        })
        .register(require('fastify-auth'))
})