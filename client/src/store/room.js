import { makeAutoObservable, configure } from 'mobx'

import roomService from '../services/roomService'
import userService from '../services/userService'


configure({ enforceActions: 'never' })

class Room {

    _idSelected = null
    _myRooms = new Array(0)
    _room = {
        id: null,
        name: '',
        users: [],
        admins: []
    }

    constructor() {
        makeAutoObservable(this)
    }

    get myRooms() {
        return this._myRooms
    }

    getSelected(id) {
        if(this._idSelected === id) return true
        return false
    }

    get idSelected() {
        if(!this._idSelected) {
            const idRoomSelected = localStorage.getItem('idRoomSelected')
            if(idRoomSelected) this._idSelected = idRoomSelected
        }
        return this._idSelected
    }

    /**
     * @param {number} id
     */
    set idSelected(id) {
        this._idSelected = id
        localStorage.setItem('idRoomSelected', id)
    }

    async fetchMyRooms() {
        try {
            this._myRooms = new Array(0)
            const response = await roomService.FetchRooms()
            this._myRooms.push(...response.data)

            const idRoomSelected = Number(localStorage.getItem('idRoomSelected'))
            if (idRoomSelected) {
                const findRoom = this._myRooms.find(selectRoom => selectRoom.id === idRoomSelected)
                if(!findRoom) {
                    localStorage.removeItem('idRoomSelected')
                    this._idSelected = null
                } else {
                    this._idSelected = idRoomSelected
                }
            }
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async addRoom(newRoom) {
        try {
            const response = await roomService.AddRoom(newRoom)
            this._myRooms.push(response.data)
            this._idSelected = response.data.id
            localStorage.setItem('idRoomSelected', this._idSelected)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async delRoom(whereRoom) {
        try {
            const response = await roomService.DeleteRoom(whereRoom)
            this._myRooms = this._myRooms.filter(room => room.id !== response.data.id)

            if(response.data.id === this._idSelected) {
                this.idSelected = null
                localStorage.removeItem('idRoomSelected')
            }
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    findRoom(id) {
        return this._myRooms.find(item => item.id === id)
    }

    async fetchSelectedRoom() {
        if(!this._idSelected) return

        try {
            this._room = {
                id: null,
                name: '',
                users: [],
                admins: []
            }
            const response = await roomService.FetchRoom(this._idSelected)
            this._room.id = Number(response.data.id)
            this._room.name = Number(response.data.name)

            await response.data.users.forEach(async (user) => {
                const getUser = await userService.FetchUser(user.userId)
                const { id, firstName, lastName, userName } = getUser.data
                this._room.users.push({ id, firstName, lastName, userName })
            })

            await response.data.admins.forEach(async (admin) => {
                const getAdmin = await userService.FetchUser(admin.userId)
                const { id, firstName, lastName, userName } = getAdmin.data
                this._room.admins.push({ id, firstName, lastName, userName })
            })
            
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    get selectedRoom() {
        return this._room
    }

    async addUserToSelectedRoom(userId) {
        if(!this._room.id||!userId) return
        
        try {
            await roomService.AddUserToRoom({id: this._room.id, userId: userId})
            const getUser = await userService.FetchUser(userId)
            const { id, firstName, lastName, userName } = getUser.data
            this._room.users.push({ id, firstName, lastName, userName })
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async delUserToSelectedRoom(userId) {
        if(!this._room.id||!userId) return
        
        try {
            await roomService.DelUserToRoom({id: this._room.id, userId: userId})
            const removeIndex = this._room.users.findIndex((user) => user.id === userId)
            if(removeIndex >= 0) this._room.users.splice(removeIndex, 1) 
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    
}

export default new Room()