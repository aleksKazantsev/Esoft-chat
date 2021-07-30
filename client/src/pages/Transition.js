import { TransitionGroup } from "react-transition-group"
import { Slide, List } from '@material-ui/core'
import { Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { useEffect, createRef } from "react"

import SelectUser from "../components/SelectUser"
import room from "../store/room"
import ItemRoom from "../components/ItemRoom"

const ref = createRef()


const Transition = observer(() => {
    useEffect(() => room.fetchMyRooms(), [])

    return (
        <Fragment>
            <SelectUser/>
            <List>
            <TransitionGroup
                component={null}
            >
            {room.myRooms.map(({ id, name }) => (
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
        </Fragment>
    )
})

export default Transition