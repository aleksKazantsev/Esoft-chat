import { observer } from 'mobx-react-lite'
import { FormControl, TextField, Grow } from '@material-ui/core'
import { PersonAdd } from '@material-ui/icons'
import { useState } from 'react'
import { FixedSizeList as List } from 'react-window'

import ItemUser from './ItemUser'
import users from '../store/users'


const SelectUser = observer(() => {
    const [visibility, setVisibility] = useState(false)

    return (
        <FormControl>
            <TextField 
                variant='outlined'
                label={ <PersonAdd style={{paddingBottom: 10}} /> }
                onClick={_ => {
                    setVisibility(true)
                    users.fetchUsers()
                }}
                onBlur={_ => setVisibility(false)}
                onChange={event => users.valueIncludes = event.target.value}
            />
            <div onClick={_ => setVisibility(false)}>
                <Grow in={visibility}>
                    <List 
                        style={{
                            position: 'absolute', 
                            boxShadow: '0 0 10px rgba(0,0,0,0.5)'
                        }} 
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