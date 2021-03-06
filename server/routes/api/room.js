module.exports = async (fastify, opts) => {
    
    fastify.route({
        method: 'POST',
        url: '/room',
        handler: async (request, reply) => fastify.roomController.addRoom(request, reply)
    })

    fastify.route({
        method: 'PATCH',
        url: '/room',
        handler: async (request, reply) => fastify.roomController.renameRoom(request, reply)
    })

    fastify.route({
        method: 'DELETE',
        url: '/room',
        handler: async (request, reply) => fastify.roomController.deleteRoom(request, reply)
    })

    fastify.route({
        method: 'GET',
        url: '/rooms',
        handler: async (request, reply) => fastify.roomController.getRooms(request, reply)
    })

    fastify.route({
        method: 'POST',
        url: '/room/user',
        handler: async (request, reply) => fastify.roomController.addUserToRoom(request, reply)
    })

    fastify.route({
        method: 'DELETE',
        url: '/room/user',
        handler: async (request, reply) => fastify.roomController.delUserToRoom(request, reply)
    })

    fastify.route({
        method: 'POST',
        url: '/room/admin',
        handler: async (request, reply) => fastify.roomController.addAdminToRoom(request, reply)
    })

    fastify.route({
        method: 'DELETE',
        url: '/room/admin',
        handler: async (request, reply) => fastify.roomController.delAdminToRoom(request, reply)
    })

    fastify.route({
        method: 'GET',
        url: '/room/:roomId',
        handler: async (request, reply) => fastify.roomController.getRoom(request, reply)
    })

}