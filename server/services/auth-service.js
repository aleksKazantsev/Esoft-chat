const fp = require('fastify-plugin')
const createError = require('http-errors')

class AuthService {
    constructor(fastify) {
        this._fastify = fastify
    }

    async login(data) {
        const user = this._fastify.userService
        const token = this._fastify.tokenService
        const dtoUser = await user.comparePassword(data)
        const tokens = token.generateTokens(dtoUser)
        const updateUser = {
            where: { id: dtoUser.id },
            data: { refreshToken: tokens.refreshToken }
        }
        const patchUser = await user.patchUser(updateUser)
        return {...patchUser, ...tokens}
    }

    async logout(refreshToken) {
        const user = this._fastify.userService
        const updateUser = {
            where: { refreshToken: refreshToken },
            data: { refreshToken: null }
        }
        const patchUser = await user.patchUser(updateUser)
        return patchUser
    }

    async refresh(refreshToken) {
        const user = this._fastify.userService
        const token = this._fastify.tokenService
        if(!refreshToken) throw createError(401, 'Пользователь не авторизован')
        const validate = token.validateRefreshToken(refreshToken)
        const dbUser = await user.getUser({ refreshToken: refreshToken })
        if(!validate || !dbUser) throw createError(401, 'Пользователь не авторизован')
        const dtoUser = {
            id: validate.id,
            firstName: validate.firstName
        }
        const tokens = token.generateTokens(dtoUser)
        const updateUser = {
            where: { id: dtoUser.id },
            data: { refreshToken: tokens.refreshToken }
        }
        const patchUser = await user.patchUser(updateUser)
        return {...patchUser, ...tokens}
    }

}

module.exports = fp(async (fastify, opts) => {
    fastify.decorate('authService', new AuthService(fastify))
})