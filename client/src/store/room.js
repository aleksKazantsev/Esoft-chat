import { makeAutoObservable, configure } from 'mobx'

import roomService from '../services/roomService'


configure({ enforceActions: 'never' })

class Room {

    _myRooms = new Array(0)

    constructor() {
        makeAutoObservable(this)
    }

    get myRooms() {
        return this._myRooms
    }

    async fetchMyRooms() {
        try {
            this._myRooms = new Array(0)
            const response = await roomService.FetchRooms()
            this._myRooms.push(...response.data)
        } catch (e) {
            if(e.response.status === 401) document.location.replace('/login')
            console.log(e.response?.data?.message)
        }
    }

    async addRoom(newRoom) {
        try {
            const response = await roomService.AddRoom(newRoom)
            this._myRooms.push(response.data)
        } catch (e) {
            if(e.response.status === 401) document.location.replace('/login')
            console.log(e.response?.data?.message)
        }
    }

    async delRoom(whereRoom) {
        try {
            const response = await roomService.DeleteRoom(whereRoom)
            this._myRooms = this._myRooms.filter(room => room.id !== response.data.id)
        } catch (e) {
            if(e.response.status === 401) document.location.replace('/login')
            console.log(e.response?.data?.message)
        }
    }
}

export default new Room()