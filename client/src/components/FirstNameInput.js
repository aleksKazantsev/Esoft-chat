import { observer } from 'mobx-react-lite'
import { TextField, InputAdornment, IconButton } from '@material-ui/core'
import { Person } from '@material-ui/icons'

import user from '../store/user'


const FirstNameInpiut = observer(() => {
    const { firstName: firstNameError } = user.errorsRegistration

    return (
        <TextField
            style={{ marginBottom: 30 }}
            variant='outlined'
            label='Введите Имя'
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
            error={firstNameError ? true : false}
            helperText={firstNameError}
            onChange={event => user.firstName = event.target.value}
        />
    )
})

export default FirstNameInpiut