const fp = require('fastify-plugin')

class RoomController {
    constructor(fastify) {
        this._room = fastify.roomService
    }

    async addRoom(request, reply) {
        try {
            const { refreshToken } = request.cookies
            return reply.send(await this._room.addRoom(request.body, refreshToken))
        } catch (e) {
            throw e
        }
    }

    async renameRoom(request, reply) {
        try {
            const { refreshToken } = request.cookies
            return reply.send(await this._room.renameRoom(request.body, refreshToken))
        } catch (e) {
            throw e
        }
    }

    async deleteRoom(request, reply) {
        try {
            const { refreshToken } = request.cookies
            return reply.send(await this._room.deleteRoom(request.body, refreshToken))
        } catch (e) {
            throw e
        }
    }

    async getRooms(request, reply) {
        try {
            const { refreshToken } = request.cookies
            return reply.send(await this._room.getRooms(refreshToken))
        } catch (e) {
            throw e
        }
    }

    async addUserToRoom(request, reply) {
        try {
            const { refreshToken } = request.cookies
            return reply.send(await this._room.addUserToRoom(request.body, refreshToken))
        } catch (e) {
            throw e
        }
    }

    async delUserToRoom(request, reply) {
        try {
            const { refreshToken } = request.cookies
            return reply.send(await this._room.delUserToRoom(request.body, refreshToken))
        } catch (e) {
            throw e
        }
    }
}

module.exports = fp(async (fastify, opts) => {
    fastify.decorate('roomController', new RoomController(fastify))
})