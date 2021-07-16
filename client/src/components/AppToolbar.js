import { observer } from 'mobx-react-lite'
import { Toolbar, Button } from '@material-ui/core'
import { InvertColors, Home, PersonAdd, ExitToApp } from "@material-ui/icons/"

import theme from '../store/theme'
import user from '../store/user'

const AppToolbar = observer(() => {
    return (
        <Toolbar>
            {document.location.pathname === '/registration' ? 
            <Button href='/'>
                <Home />
            </Button> : null }
            {document.location.pathname === '/login' ? 
            <Button href='/registration'>
                <PersonAdd />
            </Button> : null }
            {document.location.pathname === '/' ?
            <Button onClick={_=> {
                user.Logout()
                
            }}>
                <ExitToApp />
            </Button> : null }
            <Button onClick={_=>theme.changeType()}>
                <InvertColors />
            </Button>
        </Toolbar>
    )
})

export default AppToolbar