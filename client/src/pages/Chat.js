import { observer } from 'mobx-react-lite'
import { Grid } from '@material-ui/core'
import { Redirect } from 'react-router-dom'

import SelectUser from '../components/SelectUser'


const Chat = observer(() => {
    if (localStorage.getItem('token'))
        return (
            <Grid
                container
                direction='row'
                justify='center'
                alignItems='flex-start'
            >
                <form>
                    <SelectUser />
                </form>
            </Grid>
        )
    else
        document.location.pathname = '/login'
        return (
            <Redirect to='/login' />
        )
})

export default Chat