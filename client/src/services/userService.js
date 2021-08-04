import api from "../http/axios"


export default class UserService {
    static async FetchUsers() {
        return await api.get('/users')
    }

    static async FetchUser(userId) {
        return await api.get(`/user/${userId}`)
    }
}