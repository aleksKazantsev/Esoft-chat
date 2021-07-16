import { observer } from 'mobx-react-lite'
import { Fragment } from 'react'
import { Button } from '@material-ui/core'
import { Fingerprint } from '@material-ui/icons'
import Alert from '@material-ui/lab/Alert'

import MultiLoginInput from '../components/MultiLoginInput'
import PasswordInput from '../components/PasswordInput'
import user from '../store/user'


const Login = observer(() => {
    const { userName, phone, email, password } = user.loginData
    
    return (
        <Fragment>
            { user.serverLoginError 
                ? <Alert severity='error'>{ user.serverLoginError }</Alert> 
                : null 
            }
            <MultiLoginInput />
            <PasswordInput />
            <Button 
                className='ButtonControl'
                onClick={_ => user.Login()}
                disabled={
                    (userName || phone || email) && password ? false : true
                }
            >
                <Fingerprint />
            </Button>
        </Fragment>
    )
})

export default Login