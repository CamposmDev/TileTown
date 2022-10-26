import { Grid, Typography, Stack, Button } from "@mui/material"

interface Props {
    title: string,
    content: string,
    value: string
}

const EditUserPropertyForm = (props: Props) => {
    return (
        <Grid item sx={{ml: 50, mr: 50}}>
            <Stack direction='column' spacing={1}>
                <Typography variant="body1"><b>{props.title}</b></Typography>
                <Stack direction='row' alignItems='center'>
                    <Typography variant="body1" flexGrow={1}>{props.content}&ensp;<b>{props.value}</b></Typography>
                    <Button>Change</Button>
                </Stack>
            </Stack>
        </Grid>
    )
}

export default EditUserPropertyForm