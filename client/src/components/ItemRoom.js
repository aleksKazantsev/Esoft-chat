import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import MeetingRoom from '@material-ui/icons/MeetingRoom'

const ItemRoom = ({ data, index, style }) => {
    return (
        <ListItem style={style} button key={index} >
            <ListItemIcon>
                <MeetingRoom />
            </ListItemIcon>
            <ListItemText secondary={ data[index].name } />
        </ListItem>
    )
}

export default ItemRoom