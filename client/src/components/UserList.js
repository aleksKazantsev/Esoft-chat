import { observer } from 'mobx-react-lite'
import React from 'react'
import { List, Slide } from '@material-ui/core'
import { TransitionGroup } from "react-transition-group"

import AddUser from './AddUser'
import room from '../store/room'
import ItemUserList from './ItemUserList'


const ref = React.createRef()

const UserList = observer(() => {
    React.useEffect(() => {room.fetchSelectedRoom()}, [])

    return (
        <div >
            <AddUser />
            <List>
                <TransitionGroup
                    component={null}
                >
                {room.selectedRoom.users.map((user) => (
                    <Slide
                        key={user.id}
                        direction='right'
                        timeout={1000}
                    >
                    <ItemUserList  
                        ref={ref}
                        userId={user.id}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        userName={user.userName}
                    />
                    </Slide>
                ))}
                </TransitionGroup>
            </List>
        </div>
    )
})

export default UserList