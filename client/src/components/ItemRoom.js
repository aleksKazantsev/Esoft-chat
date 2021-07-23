import { observer } from 'mobx-react-lite'
import { ListItem, ListItemIcon, ListItemText, IconButton, Slide } from '@material-ui/core'
import { MeetingRoom, Delete } from '@material-ui/icons'
import { useState } from 'react'

import room from '../store/room'


const ItemRoom = observer(({ data, index }) => {
    const [inSlide, setInSlide] = useState(true)
    return (
        <Slide key={data[index].id}  direction='right' in={inSlide} mountOnEnter unmountOnExit>
        <ListItem 
            selected={room.getSelected(data[index].id)}
            onClick={_ => room.idSelected = data[index].id}
        >
            <ListItemIcon>
                <MeetingRoom />
            </ListItemIcon>
            <ListItemText secondary={ data[index].name } />
            <ListItemIcon>
                <IconButton 
                    onClick={event => {
                        event.stopPropagation()
                        setInSlide(!inSlide)
                        room.delRoom({ where: {id: data[index].id} })
                    }}
                >
                    <Delete />
                </IconButton>
            </ListItemIcon>
        </ListItem>
        </Slide>
    )
})

export default ItemRoom