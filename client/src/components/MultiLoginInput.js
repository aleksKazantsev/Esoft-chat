import {observer} from 'mobx-react-lite'
import { TextField, Icon, InputAdornment, IconButton } from '@material-ui/core'
import { Phone, Email, Person } from '@material-ui/icons'

import user from '../store/user'

const MultiLoginInput = observer(() => {
    const { userName, phone, email } = user.loginData
    const { login: loginError } = user.errorsLogin

    return (
        <TextField 
            variant='outlined'
            label={<span><Icon>person</Icon><Icon>email</Icon><Icon>phone</Icon></span>}
            type={ phone ? 'tel' : 'text' }
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton edge='end'>
                            { userName ? <Person /> : null }
                            { phone ? <Phone /> : null }
                            { email ? <Email /> : null }
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            error={loginError ? true : false}
            helperText={loginError}
            autoComplete='off'
            onChange={event => user.loginData = event.target.value}
        />
    )
})

export default MultiLoginInput