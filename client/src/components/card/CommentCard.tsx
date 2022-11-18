import { Box, Card, CardContent, Grid, Typography } from "@mui/material"
import { useEffect } from "react"
import UserProfileBox from "../UserProfileBox"

interface Props {
    commentId: string
}

const CommentCard = (props: Props) => {
    useEffect(() => {

    })
    return (
        <Card sx={{mt: 1}}>
            <CardContent>
                <Grid container alignItems={'center'}>
                    {/* <UserProfileBox
                        firstName="John"
                        lastName="Doe"
                        username="TheBullDozer"
                    /> */}
                    <Box flexGrow={1}/>
                    <Typography>{'Dec 9 2022'}</Typography>
                    <Grid container mt={1}>
                        {/* <Typography>{comment}</Typography> */}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CommentCard