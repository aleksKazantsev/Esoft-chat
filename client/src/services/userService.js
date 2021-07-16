import api from "../http/axios"


export default class UserService {
    static async FetchUsers() {
        return await api.get('/users')
    }
}