import api from "../http/axios"


export default class RoomService {
    static async FetchRooms() {
        return await api.get('/rooms')
    }

    static async AddRoom(data) {
        return await api.post('/room', data)
    }

    static async RenameRoom(data) {
        return await api.patch('/room', data)
    }

    static async DeleteRoom(data) {
        return await api.delete('/room', data)
    }

    static async AddUserToRoom(data) {
        return await api.post('/room/user', data)
    }

    static async DelUserToRoom(data) {
        return await api.delete('/room/user', data)
    }

    static async AddAdminToRoom(data) {
        return await api.post('/room/admin', data)
    }

    static async DelAdminToRoom(data) {
        return await api.delete('/room/admin', data)
    }
}