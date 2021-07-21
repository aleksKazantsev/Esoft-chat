import { observer } from 'mobx-react-lite'
import { Grid } from '@material-ui/core'

import SelectUser from '../components/SelectUser'
import RoomList from '../components/RoomList'
import user from '../store/user'


const Chat = observer(() => {
    user.Refresh()
    return (
        <Grid
            container
            direction='row'
            justify='center'
            alignItems='flex-start'
        >
            <form>
                <SelectUser />
                <RoomList />
            </form>
        </Grid>
    )
})

export default Chat