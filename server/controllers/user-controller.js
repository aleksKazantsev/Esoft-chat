
const fp = require('fastify-plugin')

class UserController {
    constructor(fastify) {
        this._user = fastify.userService
        this._auth = fastify.authService
    }

    async registration(request, reply) {
        try {
            return reply.send(await this._user.createUser(request.body))
        } catch (e) {
            throw e
        }
    }

    async login(request, reply) {
        try {
            const user = await this._auth.login(request.body)
            reply.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return reply.send(user)
        } catch (e) {
            throw e
        }
    }

    async logout(request, reply) {
        try {
            const {refreshToken} = request.cookies
            const user = await this._auth.logout(refreshToken)
            reply.clearCookie('refreshToken')
            return reply.send(user)
        } catch (e) {
            throw e
        }
    }

    async refresh(request, reply) {
        try {
            const { refreshToken } = request.cookies
            const user = await this._auth.refresh(refreshToken)
            reply.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return reply.send(user)
        } catch (e) {
            throw e
        }
    }

    async getUsers(request, reply) {
        try {
            const users = await this._user.getUsers()
            return reply.send(users)
        } catch (e) {
            throw e
        }
    }

}

module.exports = fp(async (fastify, opts) => {
    fastify.decorate('userController', new UserController(fastify))
})