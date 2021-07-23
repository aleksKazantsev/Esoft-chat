import { makeAutoObservable } from 'mobx'
import { createMuiTheme } from '@material-ui/core'


const themes = {
    DARK: 'dark',
    LIGHT: 'light'
}

class Theme {

    _type = themes.DARK
    _navToogle = false
    _Visibly = false

    constructor() {
        makeAutoObservable(this)
    }

    changeType() {
        if (this._type === themes.DARK) this._type = themes.LIGHT
        else this._type = themes.DARK
        localStorage.setItem('type', this._type)
    }

    get getMuiTheme() {
        const localType = localStorage.getItem('type')
        if(localType === themes.DARK || localType === themes.LIGHT) this._type = localType
        
        return createMuiTheme({
            palette: {
                type: this._type
            }
        })
    }

    get isCollapse() {
        return this._navToogle
    }

    changeToggle() {
        this._navToogle = !this._navToogle
    }

    resizeToggle() {
        const clientWidth = document.documentElement.clientWidth
        if(clientWidth > 960) {
            this._navToogle = true 
            this._Visibly = false
            return
        }
        if(!this._Visibly) {
            this._navToogle = false
            this._Visibly = true
        }
    }

}

export default new Theme()