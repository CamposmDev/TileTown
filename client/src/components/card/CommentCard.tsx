import { Box, Card, CardContent, Grid, Typography } from "@mui/material"
import ProfileBox from "../ProfileBox"

const CommentCard = () => {
    return (
        <Card sx={{mt: 1}}>
            <CardContent>
                <Grid container alignItems={'center'}>
                    <ProfileBox
                        firstName="John"
                        lastName="Doe"
                        username="TheBullDozer"
                    />
                    <Box flexGrow={1}/>
                    <Typography>{'Dec 9 2022'}</Typography>
                    <Grid container mt={1}>
                        <Typography>This does not meet my expectations! I expected tighter tile maps on this website, but have so far found nothing! I am going to delete my account and no one can do anything about it!</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CommentCard