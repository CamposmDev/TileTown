import { Button, Grid, Toolbar, IconButton, Tooltip, Stack } from "@mui/material"
import { Save, Publish, Delete, Download, Undo, Redo, Edit, FormatColorFill } from "@mui/icons-material"
import {FaEraser} from 'react-icons/fa'
import TilesetEditorDrawer from "./TilesetEditorDrawer"
import Canvas from "./Canvas"

const TilesetEditorScreen = () => {
    return (
        <Grid alignItems='center'>
            <Toolbar sx={{boxShadow: 1}} variant='dense'>
                <Grid container direction='row' alignItems='center'>
                    <TilesetEditorDrawer/>
                    <Grid item flexGrow={1}>
                        <Tooltip title='Save' arrow children={
                            <IconButton color='primary' children={<Save/>}/>}/>
                        <Tooltip title='Download' arrow children={
                            <IconButton color='primary' children={<Download/>}/>}/>
                        <Tooltip title='Undo' arrow children={
                            <IconButton color='primary' children={<Undo/>}/>}/>
                        <Tooltip title='Redo' arrow children={
                            <IconButton color='primary' children={<Redo/>}/>}/>
                        <Tooltip title='Draw' arrow children={
                            <IconButton color='primary' onDoubleClick={() => console.log('double clicked')} children={<Edit/>}/>}/>
                        <Tooltip title='Eraser' arrow children={
                            <IconButton color='primary'><FaEraser></FaEraser></IconButton>}/>
                            <Tooltip title='Fill' arrow children={
                            <IconButton color='primary' children={<FormatColorFill/>}/>}/>
                    </Grid>
                    <Grid item>
                        <Stack direction={'row'} spacing={1}>
                            <Button startIcon={<Delete/> } color='error'>Delete</Button>
                            <Button startIcon={<Publish/> } color='primary'>Publish</Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Toolbar>
            <Canvas/>
        </Grid>
    )
}

export default TilesetEditorScreen