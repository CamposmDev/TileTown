import { Box, Card, CardContent, Grid, Typography } from "@mui/material"
import ProfileBox from "../ProfileBox"

const CommentCard = () => {
    const comment = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo'
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
                        <Typography>{comment}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CommentCard