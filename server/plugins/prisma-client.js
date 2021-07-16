const fp = require('fastify-plugin')
const { PrismaClient } = require('@prisma/client')

module.exports = fp(async (fastify, opts) => {
  fastify.decorate('prismaClient', new PrismaClient)
})