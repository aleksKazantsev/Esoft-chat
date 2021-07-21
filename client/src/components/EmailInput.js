import { observer } from 'mobx-react-lite'
import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import { Email } from '@material-ui/icons'

import user from '../store/user'


const PhoneInput = observer(() => {
    const { email: emailError } = user.errorsRegistration

    return (
        <TextField 
            style={{ marginBottom: 30 }}
            variant='outlined'
            label='Введите почту'
            type='email'
            autoComplete='off'
            spellCheck='false'
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton edge='end'>
                            <Email />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            error={emailError ? true : false}
            helperText={emailError}
            onChange={event => user.email = event.target.value}
        />
    )
})

export default PhoneInput