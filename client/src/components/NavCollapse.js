import { observer } from "mobx-react-lite"
import { useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import { Transition } from 'react-transition-group'

import SelectUser from '../components/SelectUser'
import RoomList from '../components/RoomList'
import theme from '../store/theme'


const useStyles = makeStyles((theme) => ({
    dropdown: {
        backgroundColor: theme.palette.background.paper
    }
}))

const NavCollapse = observer(() => {
    const classes = useStyles()

    theme.resizeToggle()
    const handleResize = useCallback(event => theme.resizeToggle(), [])
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [handleResize])

    return (
        <Transition
            in={theme.isCollapse}
            timeout={500}
            mountOnEnter
            unmountOnExit
        >
            {state => 
                <nav 
                    className={`NavCollapse ${state}`}
                >   
                    <Box boxShadow={5} className={classes.dropdown}>
                        <SelectUser />
                        <RoomList />
                    </Box>
                </nav>
            }       
        </Transition>
    )
})

export default NavCollapse