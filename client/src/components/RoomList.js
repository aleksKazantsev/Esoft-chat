import { observer } from 'mobx-react-lite'
import { useEffect, createRef } from 'react'
import { TransitionGroup } from "react-transition-group"
import { Slide, List } from '@material-ui/core'

import room from '../store/room'
import ItemRoom from "../components/ItemRoom"


const ref = createRef()

const RoomList = observer(() => {
    useEffect(() => { room.fetchMyRooms()}, [])
    return (
        <List>
        <TransitionGroup
            component={null}
        >
        {room.myRooms.slice().reverse().map(({ id, name }) => (
            <Slide
                key={id}
                direction='right'
                timeout={1000}
            >
            <ItemRoom ref={ref} id={id} name={name} />
            </Slide>
        ))}
        </TransitionGroup>
        </List>
    )
})

export default RoomList