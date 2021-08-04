import { Box } from '@material-ui/core'


const RoomTabItem = (props) => {
    const { children, value, index, ...other } = props

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box
                    className='RoomTabItem'
                >
                    {children}
                </Box>
            )}
        </div>
    )
}

export default RoomTabItem