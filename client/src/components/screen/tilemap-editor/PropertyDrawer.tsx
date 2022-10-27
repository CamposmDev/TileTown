import { Add } from "@mui/icons-material"
import { Button, Divider, Drawer, IconButton, InputAdornment, List, ListItem, Stack, TextField, Tooltip, Typography } from "@mui/material"

const PropertyDrawer = () => {
    return (
        <Drawer open={true} anchor='left' variant='permanent' PaperProps={{sx: { mt: 15 }}}>
            <Typography pl={1}>Properties</Typography>
            <Divider/>
            <Stack p={1} spacing={2}>
                <TextField label='Tilemap Name' size='small' 
                    // InputProps={{ style: { fontSize: 13 } }}
                    // InputLabelProps={{ style: { fontSize: 13 } }}
                />
                <TextField label='Tile Width' fullWidth size='small' 
                    InputProps={{
                        endAdornment: <InputAdornment position="start">tiles</InputAdornment>,
                    }}/>
                <TextField label='Tile Height' fullWidth size='small' 
                    InputProps={{
                        endAdornment: <InputAdornment position="start">tiles</InputAdornment>,
                    }}/>
            </Stack>
            <Stack pl={1} pr={1} direction='row' alignItems='center'>
                <Typography flexGrow={1}>Custom Properties</Typography>
                <Tooltip title='Add Property' arrow>
                        <IconButton color='primary'><Add/></IconButton>
                </Tooltip>
            </Stack>
            <Divider/>
            <Stack p={1}>
                <List>
                    <ListItem>
                        
                    </ListItem>
                </List>
            </Stack>
        </Drawer>
    )
}

export default PropertyDrawer