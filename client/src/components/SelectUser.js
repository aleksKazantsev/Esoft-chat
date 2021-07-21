import { observer } from 'mobx-react-lite'
import { FormControl, TextField, Grow } from '@material-ui/core'
import { ImportantDevices, PersonAdd } from '@material-ui/icons'
import { useState } from 'react'
import { FixedSizeList as List } from 'react-window'
import { makeStyles } from '@material-ui/core/styles'

import ItemUser from './ItemUser'
import users from '../store/users'


const useStyles = makeStyles((theme) => ({
    dropdown: {
        backgroundColor: theme.palette.background.paper
    }
}))

const SelectUser = observer(() => {
    const [visibility, setVisibility] = useState(false)
    const classes = useStyles()

    return (
        <FormControl >
            <TextField 
                variant='outlined'
                label={ <PersonAdd /> }
                onClick={_ => {
                    setVisibility(true)
                    users.fetchUsers()
                }}
                onBlur={_ => setVisibility(false)}
                onChange={event => users.valueIncludes = event.target.value}
            />
            <div onClick={_ => setVisibility(false)} >
                <Grow in={visibility} >
                    <List 
                        style={{
                            position: 'absolute', 
                            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                            zIndex: 1
                        }}
                        className={ classes.dropdown }
                        height={400} 
                        width={450}  
                        itemSize={60} 
                        itemCount={users.data.length} 
                        itemData={users.data} 
                    >
                        { ItemUser }
                    </List>
                </Grow>
            </div>
        </FormControl>
    )
})

export default SelectUser