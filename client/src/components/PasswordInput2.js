import { observer } from 'mobx-react-lite'
import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import { useState } from 'react'
import { Visibility, VisibilityOff  } from '@material-ui/icons'

import user from '../store/user'


const PasswordInput2 = observer(() => {
    const [visiblity, setVisiblity] = useState(false)
    const { password2: passwordError } = user.errorsRegistration

    return (
        <TextField 
            style={{ marginBottom: 30 }}
            variant='outlined'
            label='Повторите пароль'
            type={ visiblity ? 'text' : 'password'} 
            autoComplete='off'
            spellCheck='false'
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
            onChange={event => user.password2 = event.target.value}
        />
    )
})

export default PasswordInput2