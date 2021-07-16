
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'

const ItemUser = ({ data, index, style }) => {
    return (
        <ListItem style={style} button key={index} >
            <ListItemIcon>
                <AccountCircle />
            </ListItemIcon>
            <ListItemText secondary={data[index].firstName + ' ' + data[index].lastName} />
            <ListItemText secondary={'(' + data[index].userName + ')'} />
        </ListItem>
    )
}

export default ItemUser