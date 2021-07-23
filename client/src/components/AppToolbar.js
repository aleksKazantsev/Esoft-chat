import { observer } from 'mobx-react-lite'
import { Toolbar, Button } from '@material-ui/core'
import { InvertColors, Home, PersonAdd, ExitToApp, Menu, MenuOpen } from "@material-ui/icons/"
import { makeStyles } from '@material-ui/core/styles'

import theme from '../store/theme'
import user from '../store/user'


const useStyles = makeStyles((theme) => ({
    dropdown: {
        backgroundColor: theme.palette.background.default
    }
}))

const AppToolbar = observer(() => {
    const classes = useStyles()
    return (
        <Toolbar className={classes.dropdown}>
            {document.location.pathname === '/registration' ? 
            <Button href='/'>
                <Home />
            </Button> : null }
            {document.location.pathname === '/login' ? 
            <Button href='/registration'>
                <PersonAdd />
            </Button> : null }
            {document.location.pathname === '/' ?
            <Button onClick={_=> user.Logout()}>
                <ExitToApp />
            </Button> : null }
            <Button onClick={_=> theme.changeType()}>
                <InvertColors />
            </Button>
            {document.location.pathname === '/' ?
            <Button className='NavToggle' onClick={_=> theme.changeToggle()}>
                {theme.isCollapse? <MenuOpen /> : <Menu />}
            </Button> : null }
        </Toolbar>
    )
})

export default AppToolbar