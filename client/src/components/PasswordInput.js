import {observer} from 'mobx-react-lite'
import { TextField, Icon, InputAdornment, IconButton } from '@material-ui/core'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@material-ui/icons'

import user from '../store/user'

const PasswordInput = observer(() => {
    const [visiblity, setVisiblity] = useState(false)
    const { password: passwordError } = user.errorsLogin

    return (
        <TextField 
            style={{ marginBottom: 30 }}
            variant='outlined'
            label={<span><Icon>lock</Icon></span>}
            type={ visiblity ? 'text' : 'password'} 
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton onClick={_ => setVisiblity(!visiblity)} edge='end'>
                            { visiblity ? <VisibilityOff /> : <Visibility /> }
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            error={passwordError ? true : false}
            helperText={passwordError}
            autoComplete='off'
            onChange={event => user.LoginPassword = event.target.value}
        />
    )
})

export default PasswordInput