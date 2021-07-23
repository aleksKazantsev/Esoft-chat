import { makeAutoObservable, configure } from 'mobx'

import roomService from '../services/roomService'


configure({ enforceActions: 'never' })

class Room {

    _idSelected = null
    _myRooms = new Array(0)

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
            //return this._myRooms
        } catch (e) {
            if(e.response.status === 401) document.location.replace('/login')
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
            if(e.response.status === 401) document.location.replace('/login')
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
            if(e.response.status === 401) document.location.replace('/login')
            console.log(e.response?.data?.message)
        }
    }

    findRoom(id) {
        return this._myRooms.find(item => item.id === id)
    }
}

export default new Room()