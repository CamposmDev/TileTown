import { NavigateBefore, Tune } from "@mui/icons-material"
import { IconButton, Drawer, Grid, Divider, Typography, TextField, Stack, Box, InputAdornment, Checkbox, FormControlLabel } from "@mui/material"
import { useState } from "react"

const TilesetEditorDrawer = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const handleMenuOpen = () => setIsDrawerOpen(true)

    const handleMenuClose = () => setIsDrawerOpen(false)

    const drawer = (
        <Drawer anchor='left' open={isDrawerOpen} BackdropProps={{ invisible: true }} onClose={handleMenuClose}>
            <Stack spacing={1} width='300px' role='presentation' textAlign='start' p={1}>
                <Grid container alignItems='center'>
                    <IconButton onClick={handleMenuClose} children={<NavigateBefore/>}/>
                    <Typography>Properties</Typography>
                </Grid>
                <Divider/>
                <Stack direction='row' alignItems='center' spacing={1}>
                    <TextField label='Tileset Name' fullWidth size='small' />
                </Stack>
                <Grid container alignItems='center' pt={2}>
                    <Typography>Image Size</Typography>
                </Grid>
                <Divider/>
                <Stack direction='row' alignItems='center' spacing={1}>
                    <TextField label='Width' fullWidth size='small' 
                        InputProps={{
                            endAdornment: <InputAdornment position="start">px</InputAdornment>,
                        }}/>
                    <TextField label='Height' fullWidth size='small' 
                        InputProps={{
                            endAdornment: <InputAdornment position="start">px</InputAdornment>,
                        }}/>
                </Stack>
                <Grid container alignItems='center' pt={2}>
                    <Typography>Grid</Typography>
                </Grid>
                <Divider/>
                <Stack direction='column' alignItems='flex-start' spacing={1}>
                    <FormControlLabel control={<Checkbox />} labelPlacement='start' label="Enabled" />
                    <TextField label='Width' fullWidth size='small' 
                        InputProps={{
                            endAdornment: <InputAdornment position="start">px</InputAdornment>,
                        }}/>
                    <TextField label='Height' fullWidth size='small' 
                        InputProps={{
                            endAdornment: <InputAdornment position="start">px</InputAdornment>,
                        }}/>
                    
                    <TextField label='Line Size' fullWidth size='small' />
                    <TextField label='Line Color' fullWidth size='small' />
                </Stack>
            </Stack>
        </Drawer>
    )  

    return (
        <Grid item>
            <IconButton onClick={handleMenuOpen} color='primary' children={<Tune/>}/>
            {drawer}
        </Grid>
    )
}

export default TilesetEditorDrawer