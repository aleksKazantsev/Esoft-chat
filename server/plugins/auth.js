const fp = require('fastify-plugin')
const createError = require('http-errors')

module.exports = fp(async (fastify, opts) => {
    fastify
        .decorate('verifyJWTandLevel', async (request, reply) => {
            try {
                const authorizationHeader = request.headers.authorization
                if(!authorizationHeader) {
                    throw new createError(401, 'Пользователь не авторизован')
                }

                const accessToken = authorizationHeader.split(' ')[1]
                if(!accessToken) {
                    throw new createError(401, 'Пользователь не авторизован')
                }

                const userData = fastify.tokenService.validateAccessToken(accessToken);
                if(!userData) {
                    throw new createError(401, 'Пользователь не авторизован')
                }

                request.user = userData
            } catch (e) {
                throw new createError(401, 'Пользователь не авторизован')
            }
        })
        .register(require('fastify-auth'))
})