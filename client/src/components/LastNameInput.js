import { observer } from 'mobx-react-lite'
import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import { Person } from '@material-ui/icons'

import user from '../store/user'


const LastNameInpiut = observer(() => {
    const { lastNname: lastNameError } = user.errorsRegistration

    return (
        <TextField 
            style={{ marginBottom: 30 }}
            variant='outlined'
            label='Введите Фамилию'
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
            error={lastNameError ? true : false}
            helperText={lastNameError}
            onChange={event => user.lastName = event.target.value}
        />
    )
})

export default LastNameInpiut