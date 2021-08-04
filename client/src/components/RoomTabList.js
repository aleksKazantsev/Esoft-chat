import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { useState } from 'react'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import { Forum, People, Settings } from '@material-ui/icons'

import RoomTabItem from './RoomTabItem'
import UserList from './UserList'


RoomTabItem.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

function allProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        
    }
}))

const RoomTabList = () => {
    const classes = useStyles()
    const theme = useTheme()
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => { setValue(newValue) }
    const handleChangeIndex = (index) => { setValue(index) }

    return (
        <div className={classes.root}>
            <AppBar position='static' color='default'>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor='primary'
                    textColor='primary'
                    variant='fullWidth'
                    aria-label='full width tabs example'
                >
                    <Tab label={<Forum/>} {...allProps(0)} />
                    <Tab label={<People/>} {...allProps(1)} />
                    <Tab label={<Settings/>} {...allProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <RoomTabItem value={value} index={0} dir={theme.direction}>
                    Item One
                </RoomTabItem>
                <RoomTabItem value={value} index={1} dir={theme.direction}>
                    <UserList />
                </RoomTabItem>
                <RoomTabItem value={value} index={2} dir={theme.direction}>
                    Item Three
                </RoomTabItem>
            </SwipeableViews>
        </div>
    )
}

export default RoomTabList