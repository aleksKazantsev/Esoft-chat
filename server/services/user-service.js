const fp = require('fastify-plugin')
const bcrypt = require('bcryptjs')

class UserService {
    constructor(client) {
        this._client = client
    }

    async getUser(data) {
        const { user } = this._client
        const { userName, email, phone, refreshToken } = data

        if(userName) return await user.findUnique({ where: { userName: userName } })
        if(email) return await user.findUnique({ where: { email: email } })
        if(phone) return await user.findUnique({ where: { phone: phone } })
        if(refreshToken) return await user.findUnique({ where: { refreshToken: refreshToken } })
    }

    async uniqueUser(data) {
        const { userName, email, phone } = data

        if(userName) {
            const isUserName = await this.getUser({ userName: userName })
            if(isUserName) throw new Error(`Пользователь с именем ${userName} уже зарегестрирован!`)
        }

        if(email) {
            const isEmail = await this.getUser({ email: email })
            if(isEmail) throw new Error(`Пользователь с электронной почтой ${email} уже зарегестрирован!`)
        }

        if(phone) {
            const isPhone = await this.getUser({ phone: phone })
            if(isPhone) throw new Error(`Пользователь с телефоном ${phone} уже зарегестрирован!`)
        }

        return data
    }

    async createUser(data) {
        const uniqueUser = await this.uniqueUser(data)
        const { user } = this._client
        const { password } = uniqueUser
        const hash = await bcrypt.hash(password, 5)
        uniqueUser.password = hash
        
        return await user.create({ data: uniqueUser })
    }

    async getUsers() {
        const { user } = this._client

        return await user.findMany()
    }

    async patchUser(data) {
        const { user } = this._client
        const { data: newData } = data
        await this.uniqueUser(newData)
        
        return await user.update(data)
    }

    async comparePassword(data) {
        const searchUser = await this.getUser(data)
        if(!searchUser) throw new Error('Пользователь с таким именем и паролем ненайден!')
        const compare =  await bcrypt.compare(data.password, searchUser.password)
        if(!compare) throw new Error('Пользователь с таким именем и паролем ненайден!') 
        const dtoUser = {
            id: searchUser.id,
            firstName: searchUser.firstName
        }

        return dtoUser
    }
}

module.exports = fp(async (fastify, opts) => {
    fastify.decorate('userService', new UserService(fastify.prismaClient))
})