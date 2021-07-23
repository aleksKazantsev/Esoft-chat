import { observer } from 'mobx-react-lite'
import { FixedSizeList as List } from 'react-window'
import { useEffect, useState } from 'react'

import ItemRoom from './ItemRoom'
import room from '../store/room'


const RoomList = observer(() => {
    const [myRooms, setMyRooms] = useState([])
    useEffect(() => {
        room.fetchMyRooms()
        setMyRooms(room.myRooms)
    }, [])
    
    return (
        <List 
            height={400} 
            width={450}  
            itemSize={80} 
            itemCount={myRooms.length} 
            itemData={myRooms} 
        >
            { ItemRoom }
        </List>
    )
})

export default RoomList