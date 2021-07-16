module.exports = async (fastify, opts) => {
    fastify.route({
        method: 'POST',
        url: '/registration',
        handler: async (request, reply) => fastify.userController.registration(request, reply)
    })

    fastify.route({
        method: 'PATCH',
        url: '/login',
        handler: async (request, reply) => fastify.userController.login(request, reply)
    })

    fastify.route({
        method: 'PATCH',
        url: '/refresh',
        handler: async (request, reply) => fastify.userController.refresh(request, reply)
    })

    fastify.route({
        method: 'GET',
        url: '/users',
        handler: async (request, reply) => fastify.userController.getUsers(request, reply)
    })

    fastify.route({
        method: 'PATCH',
        url: '/logout',
        handler: async (request, reply) => fastify.userController.logout(request, reply)
    })
}