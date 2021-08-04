import { observer } from 'mobx-react-lite'
import { Button } from '@material-ui/core'
import { Fingerprint } from '@material-ui/icons'
import Alert from '@material-ui/lab/Alert'

import MultiLoginInput from '../components/MultiLoginInput'
import PasswordInput from '../components/PasswordInput'
import user from '../store/user'


const Login = observer(() => {
    const { userName, phone, email, password } = user.loginData
    
    return (
        <form>
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
        </form>
    )
})

export default Login