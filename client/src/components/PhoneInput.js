import { observer } from 'mobx-react-lite'
import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import { Phone } from '@material-ui/icons'

import user from '../store/user'


const PhoneInput = observer(() => {
    const { phone: phoneError } = user.errorsRegistration

    return (
        <TextField 
            variant='outlined'
            label='Введите телефон'
            type='tel'
            autoComplete='off'
            spellCheck='false'
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton edge='end'>
                            <Phone />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            error={phoneError ? true : false}
            helperText={phoneError}
            onChange={event => user.phone = event.target.value}
        />
    )
})

export default PhoneInput