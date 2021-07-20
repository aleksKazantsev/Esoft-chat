import api from "../http/axios"


export default class AuthService {
    static async Login(data) {
        return await api.patch('/login', data)
    }

    static async Registration(data) {
        return await api.post('/registration', data)
    }

    static async Logout() {
        return await api.patch('/logout')
    }

    static async Refresh() {
        return await api.patch('/refresh')
    }

}