const fp = require('fastify-plugin')
const createError = require('http-errors')


class RoomService {

    constructor(fastify) {
        this._fastify = fastify
    }

    async addRoom(data, refreshToken) {
        const { room } = this._fastify.prismaClient
        const token = this._fastify.tokenService
        const validate = token.validateRefreshToken(refreshToken)
        if(!validate) throw createError(401, 'Пользователь не авторизован')
        const newRoom = {...data, admins: { create: { userId: validate.id }}, users: { create: { userId: validate.id }}}

        return await room.create({ data: newRoom })
    }
    
    async renameRoom(data, refreshToken) {
        const { room } = this._fastify.prismaClient
        const token = this._fastify.tokenService
        const validate = token.validateRefreshToken(refreshToken)
        if(!validate) throw createError(401, 'Пользователь не авторизован')

        const getRoom = await room.findUnique({ where: data.where, include: { admins: true } })
        let isAdmin = false
        getRoom.admins.forEach(admin => admin.userId === validate.id ? isAdmin = true : null)
        if(!isAdmin) throw createError(403, 'Доступ запрещен')

        return await room.update(data)
    }

    async deleteRoom(data, refreshToken) {
        const { room, roomOnAdmin, roomOnUser } = this._fastify.prismaClient
        const token = this._fastify.tokenService
        const validate = token.validateRefreshToken(refreshToken)
        if(!validate) throw createError(401, 'Пользователь не авторизован')

        const getRoom = await room.findUnique({ where: data.where, include: { admins: true, users: true } })
        let isAdmin = false
        getRoom.admins.forEach(admin => admin.userId === validate.id ? isAdmin = true : null)
        if(!isAdmin) throw createError(403, 'Доступ запрещен')

        await roomOnAdmin.deleteMany({ where: { OR: getRoom.admins }})
        await roomOnUser.deleteMany({ where: { OR: getRoom.users }})
        return await room.delete(data)
    }

    async getRooms(refreshToken) {
        const { user, room } = this._fastify.prismaClient
        const token = this._fastify.tokenService
        const validate = token.validateRefreshToken(refreshToken)
        if(!validate) throw createError(401, 'Пользователь не авторизован')

        const userRooms = await user.findUnique({ where: { id: validate.id }}).rooms()
        const whereRooms = new Array
        userRooms.forEach(userRoom => whereRooms.push({ id: userRoom.roomId }))

        return await room.findMany({ where: { OR: whereRooms }})
    }

    async addUserToRoom(data, refreshToken) {
        const { room } = this._fastify.prismaClient
        const token = this._fastify.tokenService
        const validate = token.validateRefreshToken(refreshToken)
        if(!validate) throw createError(401, 'Пользователь не авторизован')

        const getRoom = await room.findUnique({ where: { id: data.id }, include: { admins: true, users: true }})

        let isAdmin = false
        getRoom.admins.forEach(admin => admin.userId === validate.id ? isAdmin = true : null)
        if(!isAdmin) throw createError(403, 'Доступ запрещен')

        let isUser = false
        getRoom.users.forEach(roomUser => roomUser.userId === data.userId ? isUser = true : null)
        if(isUser) throw createError(423, 'Пользователь уже добавлен в комнату')

        return await room.update({ where: { id: data.id }, data: { users: { create: { userId: data.userId }}}})
    }

    async delUserToRoom(data, refreshToken) {
        const { room, roomOnUser } = this._fastify.prismaClient
        const token = this._fastify.tokenService
        const validate = token.validateRefreshToken(refreshToken)
        if(!validate) throw createError(401, 'Пользователь не авторизован')

        const getRoom = await room.findUnique({ where: { id: data.id }, include: { admins: true, users: true }})

        let isAdmin = false
        getRoom.admins.forEach(admin => admin.userId === validate.id ? isAdmin = true : null)
        if(!isAdmin) throw createError(403, 'Доступ запрещен')

        return await room.update({ where: { id: data.id }, data: { users: { delete: { where: {userId: data.userId }}}}})
    }
}

module.exports = fp(async (fastify, opts) => {
    fastify.decorate('roomService', new RoomService(fastify))
})