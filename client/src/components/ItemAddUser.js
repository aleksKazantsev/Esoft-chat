import { observer } from 'mobx-react-lite'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'

import room from '../store/room'


const ItemAddUser = observer((props) => {
    const { userId, firstName, lastName, userName } = props
    return (
        <ListItem button onClick={event => {
            event.stopPropagation()
            room.addUserToSelectedRoom(userId)
            }}    
        >
            <ListItemIcon>
                <AccountCircle/>
            </ListItemIcon>
            <ListItemText secondary={firstName} />
            { lastName? <ListItemText secondary={' ' + lastName} /> : null }
            { userName? <ListItemText secondary={'(' + userName + ')'} /> : null }
        </ListItem>
    )
})

export default ItemAddUser