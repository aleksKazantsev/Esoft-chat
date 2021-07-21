import { observer } from 'mobx-react-lite'
import { FixedSizeList as List } from 'react-window'
import { useEffect } from 'react'

import ItemRoom from './ItemRoom'
import room from '../store/room'


const RoomList = observer(() => {
    
    useEffect(() => { room.fetchMyRooms() }, [])
    
    return (
        <List 
            height={400} 
            width={450}  
            itemSize={60} 
            itemCount={room.myRooms.length} 
            itemData={room.myRooms} 
        >
            { ItemRoom }
        </List>
    )
})

export default RoomList