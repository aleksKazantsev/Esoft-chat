import { observer } from 'mobx-react-lite'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'

import room from '../store/room'


const ItemUser = observer(({ data, index, style }) => {
    let nameRoom = data[index].firstName
    if(data[index].lastName) nameRoom = nameRoom + ' ' + data[index].lastName

    return (
        <ListItem 
            style={style} 
            button 
            key={index}
            onClick={_ => room.addRoom({ name: nameRoom })}
        >
            <ListItemIcon>
                <AccountCircle />
            </ListItemIcon>
            <ListItemText secondary={data[index].firstName} />
            { data[index].lastName? <ListItemText secondary={' ' + data[index].lastName} /> : null }
            { data[index].userName? <ListItemText secondary={'(' + data[index].userName + ')'} /> : null }
        </ListItem>
    )
})

export default ItemUser