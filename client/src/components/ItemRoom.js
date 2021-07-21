import { observer } from 'mobx-react-lite'
import { ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core'
import { MeetingRoom, Delete } from '@material-ui/icons'

import room from '../store/room'


const ItemRoom = observer(({ data, index, style }) => {
    return (
        <ListItem style={style} button key={index} >
            <ListItemIcon>
                <MeetingRoom />
            </ListItemIcon>
            <ListItemText secondary={ data[index].name } />
            <ListItemIcon>
                <IconButton 
                    onClick={_ => room.delRoom({ where: {id: data[index].id} })}
                >
                    <Delete />
                </IconButton>
            </ListItemIcon>
        </ListItem>
    )
})

export default ItemRoom