import { Box, Grid, Typography } from "@mui/material"

const MainFeedScreen = () => {
    return (
        <Grid mt={1} ml={1} container direction={'column'} spacing={1}>
            <Grid item>
                <Typography variant='h5'>Popular Tiles Maps</Typography>
            </Grid>
            <Grid item>
                <Typography variant='h5'>Popular Tiles Sets</Typography>
            </Grid>
        </Grid>
    )
}

export default MainFeedScreen