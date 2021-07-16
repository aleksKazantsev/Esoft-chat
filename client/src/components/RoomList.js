import { observer } from 'mobx-react-lite'
import { FixedSizeList as List } from 'react-window'

const RoomList = observer(() => {

    return (
        <List
            height={400} 
            width={450}  
            itemSize={60} 
        >

        </List>
    )

})

export default RoomList