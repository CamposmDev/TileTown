import { Box, Card, CardContent, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Comment, User } from "@types"
import UserProfileBox from "../UserProfileBox"

interface Props {
    commentId: string
}

const CommentCard = (props: Props) => {
    const [comment, setComment] = useState<Comment | undefined>(undefined)
    const [user, setUser] = useState<User | undefined>(undefined)
    useEffect(() => {
        let aux = async () => {
            
        }
        aux()
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
                        <Typography>{props.commentId}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default CommentCard