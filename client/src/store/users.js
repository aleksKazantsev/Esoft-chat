import { makeAutoObservable } from 'mobx'

import userService from '../services/userService'


class Users {

    _users = new Array(0)

    _keyIncludes = 'firstName'

    _valueIncludes = ''

    constructor() {
        makeAutoObservable(this)
    }

    get data() {
        return this._users.filter((user) => user[this._keyIncludes].includes(this._valueIncludes))
    }

    async fetchUsers() {
        try {
            this._users = new Array(0)
            const response = await userService.FetchUsers()
            this._users.push(...response.data)
        }
        catch (e){
            if(e.response.status === 401) document.location.replace('/login')
            console.log(e.response?.data?.message)
        }
    }

    /**
     * @param {string} key
     */
    set keyIncludes(key) {
        this._keyIncludes = key
    }

    /**
     * @param {string} value
     */
    set valueIncludes(value) {
        this._valueIncludes = value
    }

}

export default new Users()