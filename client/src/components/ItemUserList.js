import { observer } from 'mobx-react-lite'
import { ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core'
import { AccountCircle, Delete } from '@material-ui/icons'

import user from '../store/user'
import room from '../store/room'


const ItemUserList = observer((props, ref) => {
    const { userId, firstName, lastName, userName } = props

    return (                    
        <ListItem ref={ref}>
            <ListItemIcon>
                <AccountCircle />
            </ListItemIcon>
            <ListItemText secondary={firstName} />
            { lastName? <ListItemText secondary={' ' + lastName} /> : null }
            { userName? <ListItemText secondary={'(' + userName + ')'} /> : null }
            { user.data.id === userId? null:
            <ListItemIcon>
                <IconButton onClick={event => {
                    event.stopPropagation()
                    room.delUserToSelectedRoom(userId)
                }}>
                    <Delete />
                </IconButton>
            </ListItemIcon>
            }
        </ListItem>
    )
}, {forwardRef: true})

export default ItemUserList