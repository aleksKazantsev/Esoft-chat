import { makeAutoObservable } from 'mobx'
import { createMuiTheme } from '@material-ui/core'


const themes = {
    DARK: 'dark',
    LIGHT: 'light'
}

class Theme {
    _type=themes.DARK

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

}

export default new Theme()