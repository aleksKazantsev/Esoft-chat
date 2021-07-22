import { observer } from 'mobx-react-lite'
import { Grid } from '@material-ui/core'

import RoomTabList from '../components/RoomTabList'
import NavCollapse from '../components/NavCollapse'
import user from '../store/user'
import room from '../store/room'


const Chat = observer(() => {
    user.Refresh()

    return (
        <Grid
            container
            direction='row'
            justify='center'
            alignItems='flex-start'
        >
            <NavCollapse />
            {room.idSelected? <main><RoomTabList /></main> : null}
        </Grid>
    )
})

export default Chat