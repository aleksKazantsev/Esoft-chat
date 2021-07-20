import { makeAutoObservable } from 'mobx'

import autchService from '../services/autchService'


function preValidPhone(data) {
    const varMyre = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){1,14}(\s*)?$/
    return varMyre.test(data)
}

function preValidEmail(data) {
    const varMyre = /@/
    return varMyre.test(data)
}

function validEmail(data) {
    const varMyre = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
    return varMyre.test(data)
}

function validPhone(data) {
    const varMyre = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
    return varMyre.test(data)
}

const Errors = {
    REQUIRED: 'Поле обязательно для заполнения!',
    LEN: 'Поле должно содержать не менее 4-х символов!',
    PASSWORD_MISMATCH: 'Пароли не совпадают!',
    ONE_OF: 'Хотябы одно поле (имя пользователя, телефон или почта) должны быть заполнены!',
    EMAIL: 'Введенные данные не соответствуют электронной почте(me@example.com)',
    PHONE: 'Введенные данные не соответствуют телефонному номеру'
}

class User {

    _data = {}

    _serverLoginError = ''

    _serverRegistrationError = ''

    _serverRegistraionError = ''

    _formLogin = {password: ''}

    _errorsLogin = {
        login: '',
        password: ''
    }

    _formRegistration = {
        firstName: '',
        lastName: '',
        password: '',
        userName: '',
        email: '',
        phone: ''
    }

    _password1 = ''
    _password2 = ''

    _errorsRegistration = {
        firstName: '',
        lastNname: '',
        password1: '',
        password2: '',
        userName: '',
        email: '',
        phone: ''
    }
    
    constructor() {
        makeAutoObservable(this)
    }

    /**
     * @param {any} value
     */
    set loginData(value) {

        if(preValidPhone(value)) {
            this._formLogin = { 
                password: this._formLogin.password, 
                phone: value
            }
            return
        }

        if(preValidEmail(value)) {
            this._formLogin = {
                password: this._formLogin.password,
                email: value
            }
            return
        }

        this._formLogin = {
            password: this._formLogin.password,
            userName: value
        }

        if(value === '') this._errorsLogin.login = Errors.REQUIRED
        else this.errorsLogin.login = ''
    }

    get loginData() {
        return this._formLogin
    }

    /**
     * @param {any} password
     */
    set LoginPassword(password) {
        this._formLogin.password = password

        if(password === '') this._errorsLogin.password = Errors.REQUIRED
        else this.errorsLogin.password = ''
    }

    get errorsLogin() {
        return this._errorsLogin
    }

    async Login() {
        try {
            const response = await autchService.Login(this._formLogin)
            localStorage.setItem('token', response.data.accessToken)
            this._data = response.data
            this._serverLoginError = ''
            document.location.replace('/')
        } catch (e) {
            this._serverLoginError = e.response.data.message
        }
    }

    get serverLoginError() {
        return this._serverLoginError
    }

    get data() {
        return this._data
    }

    /**
     * @param {any} value
     */
    set firstName(value) {
        this._formRegistration.firstName = value

        if(value === '') this._errorsRegistration.firstName = Errors.REQUIRED
        else if(value.length < 4 && value.length > 0) this._errorsRegistration.firstName = Errors.LEN
        else this._errorsRegistration.firstName = ''
    }

    /**
     * @param {any} value
     */
    set lastName(value) {
        this._formRegistration.lastName = value

        if(value.length < 4 && value.length > 0) this._errorsRegistration.lastName = Errors.LEN
        else this._errorsRegistration.lastName = ''
    }

    get registrationData() {
        return this._formRegistration
    }

    get errorsRegistration() {
        return this._errorsRegistration
    }

    /**
     * @param {any} value
     */
    set password1(value) {
        this._password1 = value

        if(value === '') this._errorsRegistration.password1 = Errors.REQUIRED
        else if(value.length < 4 && value.length > 0) this._errorsRegistration.password1 = Errors.LEN
        else if(!(this._password1 === this._password2)) {
            this._errorsRegistration.password1 = Errors.PASSWORD_MISMATCH
            this._formRegistration.password = ''
        } else {
            this._errorsRegistration.password1 = ''
            this._errorsRegistration.password2 = ''
            this._formRegistration.password = value
        }
    }

    /**
     * @param {any} value
     */
    set password2(value) {
        this._password2 = value

        if(value === '') this._errorsRegistration.password2 = Errors.REQUIRED
        else if(value.length < 4 && value.length > 0) this._errorsRegistration.password2 = Errors.LEN
        else if(!(this._password1 === this._password2)) {
            this._errorsRegistration.password2 = Errors.PASSWORD_MISMATCH
            this._formRegistration.password = ''
        } else {
            this._errorsRegistration.password1 = ''
            this._errorsRegistration.password2 = ''
            this._formRegistration.password = value
        }
    }

    /**
     * @param {any} value
     */
    set userName(value) {
        this._formRegistration.userName = value
        
        if(this._formRegistration.userName === '' && this._formRegistration.phone === '' && this._formRegistration.email === '') {
            this._errorsRegistration.userName = Errors.ONE_OF
            this._errorsRegistration.email = Errors.ONE_OF
            this._errorsRegistration.phone = Errors.ONE_OF
        }else {
            if(this._formRegistration.userName.length < 4 && this._formRegistration.userName.length > 0) this._errorsRegistration.userName = Errors.LEN
            else this._errorsRegistration.userName = ''

            if(this._formRegistration.email.length < 4 && this._formRegistration.email.length > 0) this._errorsRegistration.email = Errors.LEN
            else if(!validEmail(this._formRegistration.email) && !(this._formRegistration.email === '')) this._errorsRegistration.email = Errors.EMAIL
            else this._errorsRegistration.email = ''

            if(this._formRegistration.phone.length < 4 && this._formRegistration.phone.length > 0) this._errorsRegistration.phone = Errors.LEN
            else if(!validPhone(this._formRegistration.phone) && !(this._formRegistration.phone === '')) this._errorsRegistration.phone = Errors.PHONE
            else this._errorsRegistration.phone = ''
        }
        
    }

    /**
     * @param {any} value
     */
    set email(value) {
        this._formRegistration.email = value

        if(this._formRegistration.userName === '' && this._formRegistration.phone === '' && this._formRegistration.email === '') {
            this._errorsRegistration.userName = Errors.ONE_OF
            this._errorsRegistration.email = Errors.ONE_OF
            this._errorsRegistration.phone = Errors.ONE_OF
        } else {
            if(this._formRegistration.userName.length < 4 && this._formRegistration.userName.length > 0) this._errorsRegistration.userName = Errors.LEN
            else this._errorsRegistration.userName = ''

            if(this._formRegistration.email.length < 4 && this._formRegistration.email.length > 0) this._errorsRegistration.email = Errors.LEN
            else if(!validEmail(this._formRegistration.email) && !(this._formRegistration.email === '')) this._errorsRegistration.email = Errors.EMAIL
            else this._errorsRegistration.email = ''

            if(this._formRegistration.phone.length < 4 && this._formRegistration.phone.length > 0) this._errorsRegistration.phone = Errors.LEN
            else if(!validPhone(this._formRegistration.phone) && !(this._formRegistration.phone === '')) this._errorsRegistration.phone = Errors.PHONE
            else this._errorsRegistration.phone = ''
        }        
    }

    /**
     * @param {any} value
     */
    set phone(value) {
        this._formRegistration.phone = value

        if(this._formRegistration.userName === '' && this._formRegistration.phone === '' && this._formRegistration.email === '') {
            this._errorsRegistration.userName = Errors.ONE_OF
            this._errorsRegistration.email = Errors.ONE_OF
            this._errorsRegistration.phone = Errors.ONE_OF
        } else {
            if(this._formRegistration.userName.length < 4 && this._formRegistration.userName.length > 0) this._errorsRegistration.userName = Errors.LEN
            else this._errorsRegistration.userName = ''

            if(this._formRegistration.email.length < 4 && this._formRegistration.email.length > 0) this._errorsRegistration.email = Errors.LEN
            else if(!validEmail(this._formRegistration.email) && !(this._formRegistration.email === '')) this._errorsRegistration.email = Errors.EMAIL
            else this._errorsRegistration.email = ''

            if(this._formRegistration.phone.length < 4 && this._formRegistration.phone.length > 0) this._errorsRegistration.phone = Errors.LEN
            else if(!validPhone(this._formRegistration.phone) && !(this._formRegistration.phone === '')) this._errorsRegistration.phone = Errors.PHONE
            else this._errorsRegistration.phone = ''
        }
    }

    async Registration() {
        try {
            await autchService.Registration(this._formRegistration)
            this._serverRegistrationError = ''
        } catch (e) {
            this._serverRegistrationError = e.response.data.message
        }
    }

    async Logout() {
        try {
            await autchService.Logout()
            localStorage.removeItem('token')
            document.location.replace('/login')
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async Refresh() {
        try {
            const response = await autchService.Refresh()
            localStorage.setItem('token', response.data.accessToken)
            this._data = response.data
        } catch (e) {
            if(e.response.status === 401) document.location.replace('/login')
            console.log(e.response?.data?.message)
        }
    }

}

export default new User()