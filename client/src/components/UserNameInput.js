import { observer } from 'mobx-react-lite'
import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import { Person } from '@material-ui/icons'

import user from '../store/user'


const UserNameInpiut = observer(() => {
    const { userName: userNameError } = user.errorsRegistration

    return (
        <TextField 
            variant='outlined'
            label='Имя пользователя'
            type='text'
            autoComplete='off'
            spellCheck='false'
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton edge='end'>
                            <Person />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            error={userNameError ? true : false}
            helperText={userNameError}
            onChange={event => user.userName = event.target.value}
        />
    )
})

export default UserNameInpiut