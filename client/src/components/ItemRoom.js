import { observer } from 'mobx-react-lite'
import { ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core'
import { MeetingRoom, Delete } from '@material-ui/icons'

import room from '../store/room'


const ItemRoom = observer((props, ref) => {

    return (
        <ListItem 
            button
            ref={ref}
            onClick={_ => {
                room.idSelected = props.id
                room.fetchSelectedRoom()
            }}
            selected={room.getSelected(props.id)}
        >
            <ListItemIcon>
                <MeetingRoom />
            </ListItemIcon>
            <ListItemText secondary={props.name} />
            <ListItemIcon>
                <IconButton
                    onClick={event => {
                        event.stopPropagation()
                        room.delRoom({ where: {id: props.id} })
                    }}
                >
                    <Delete />
                </IconButton>
            </ListItemIcon>
        </ListItem>
    )
}, {forwardRef: true})

export default ItemRoom