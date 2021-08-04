import { observer } from 'mobx-react-lite'
import { TextField, FormControl, Grow, List } from '@material-ui/core'
import { useState } from 'react'
import { PersonAdd } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

import users from '../store/users'
import room from '../store/room'
import ItemAddUser from './ItemAddUser'


const useStyles = makeStyles((theme) => ({
    dropdown: {
        backgroundColor: theme.palette.background.paper
    }
}))

const AddUser = observer(() => {
    const [visibility, setVisibility] = useState(false)
    const classes = useStyles()

    return (
        <FormControl >
            <TextField 
                variant='outlined'
                label={<PersonAdd/>}
                onClick={_ => {
                    setVisibility(true)
                    users.fetchUsers()
                }}
                onBlur={_ => setVisibility(false)}
                onChange={event => users.valueIncludes = event.target.value}
            />
            <div >
            <Grow in={visibility} timeout={500} >
                <List
                    className={ classes.dropdown }
                    style={{position: 'absolute', zIndex: 3, boxShadow: '0 0 10px rgba(0,0,0,0.5)', maxHeight: 400}}
                >
                    {users.data.filter(user => 
                    room.selectedRoom.users.findIndex(filterUser => user.id === filterUser.id ) < 0)
                    .map(filteredUser => (
                        <ItemAddUser 
                            key={filteredUser.id}
                            userId={filteredUser.id}
                            firstName={filteredUser.firstName}
                            lastName={filteredUser.lastName} 
                            userName={filteredUser.userName}  
                        />
                    ))}
                </List>
            </Grow>
            </div>
        </FormControl>
    )
})

export default AddUser