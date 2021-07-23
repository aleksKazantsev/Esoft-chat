import { CSSTransition, TransitionGroup } from "react-transition-group"
import { Add, Delete } from '@material-ui/icons'
import { IconButton, TextField, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { useState } from "react"
import { Fragment } from 'react'
import { FixedSizeList } from 'react-window'


const Item = ({ data, index }) => {
    return (
            <CSSTransition
                key={index}
                timeout={500}
                classNames='todo'
            >
            <ListItem>
                <ListItemText>{data[index].text}</ListItemText>
                <ListItemIcon>
                    <IconButton >
                        <Delete />
                    </IconButton>
                </ListItemIcon>
            </ListItem>
            </CSSTransition>
    )
}
const Transition = () => {
    const [text, setText] = useState('')
    const [todo, setTodo] = useState([{id: 1, text: 'item 1'}, {id: 2, text: 'item 2'}])
    return (
        <Fragment>
            <TextField value={text} onInput={e => setText(e.target.value)}/>
            <IconButton onClick={_ => setTodo([...todo, {id: Date.now(), text }])}>
                <Add />
            </IconButton>
            <TransitionGroup>
            <FixedSizeList
                height={400} 
                width={450}  
                itemSize={80} 
                itemCount={todo.length} 
                itemData={todo} 
            >
                
                {Item}
            </FixedSizeList>
            </TransitionGroup>
        </Fragment>
    )
}

export default Transition