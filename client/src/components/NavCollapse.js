import { observer } from "mobx-react-lite"
import { useEffect, useCallback } from 'react'

import SelectUser from '../components/SelectUser'
import RoomList from '../components/RoomList'
import theme from '../store/theme'

const NavCollapse = observer(() => {
    theme.resizeToggle()
    const handleResize = useCallback(event => theme.resizeToggle(), [])
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [handleResize])

    return (
        <nav 
            className='NavCollapse'
            style={theme.isCollapse? null : {display: 'none'}}
        >
            <SelectUser />
            <RoomList />
        </nav>
    )
})

export default NavCollapse