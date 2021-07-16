import { observer } from 'mobx-react-lite'
import { Grid, Button } from '@material-ui/core'
import PersonAdd from '@material-ui/icons/PersonAdd'

import FirstNameInput from '../components/FirstNameInput'
import LastNameInput from '../components/LastNameInput'
import UserNameInput from '../components/UserNameInput'
import EmailInput from '../components/EmailInput'
import PhoneInput from '../components/PhoneInput'
import PasswordInput1 from '../components/PasswordInput1'
import PasswordInput2 from '../components/PasswordInput2'
import user from '../store/user'


const Registration = observer(() => {
    const { firstName, userName, phone, email, password } = user.registrationData
    const { 
        email: emailError, 
        firstName: firstNameError, 
        lastNname: lastNameError, 
        password1: passwordError1, 
        password2: passwordError2,
        phone: phoneError,
        userName: userNameError 
    } = user.errorsRegistration

    let isErrors = true
    if(
        emailError === '' && 
        firstNameError === '' && 
        lastNameError === '' && 
        passwordError1 === '' && 
        passwordError2 === '' && 
        phoneError === '' && 
        userNameError === '') 
        isErrors = false

    return (
        <Grid
            container
            direction='row'
            justify='center'
            alignItems='flex-start'
        >
            <form>
                <FirstNameInput />
                <LastNameInput />
                <PasswordInput1 />
                <PasswordInput2 />
            </form>
            <form>
                <UserNameInput />
                <EmailInput />
                <PhoneInput />
                <Button 
                    className='ButtonControl'
                    onClick={_ => user.Registration()}
                    disabled={
                        (userName || phone || email) && password && firstName && !isErrors ? false : true
                    }
                >
                    <PersonAdd />
                </Button>
            </form>
        </Grid>
    )
})

export default Registration