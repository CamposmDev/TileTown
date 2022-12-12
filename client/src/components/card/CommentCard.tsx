import { Box, Card, CardContent, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import UserProfileBox from "../UserProfileBox"
import { dateToPostedStr } from "../util/DateUtils"
import { useContext } from "react"
import { SocialContext } from "src/context/social"

interface Props {
    commentId: string
}

const CommentCard = (props: Props) => {
    const social = useContext(SocialContext)
    const [state, setState] = useState({
        createdAt: new Date(),
        username: '',
        firstName: '',
        lastName: '',
        body: ''
    })
    useEffect(() => {
        social.getCommentById(props.commentId).then(comment => {
            if (comment) {
                social.getUserCredentialsById(comment.author).then(u => {
                    if (u) {
                        setState({
                            createdAt: new Date(comment.createdAt),
                            username: u.username,
                            firstName: u.firstName,
                            lastName: u.lastName,
                            body: comment.body
                        })
                    }
                })
                
            }
        })
    }, [])

    let content = 
        <Grid container alignItems={'center'}>
            <UserProfileBox
                firstName={state.firstName}
                lastName={state.lastName}
                username={state.username}
            />
            <Box flexGrow={1}/>
            <Typography>{dateToPostedStr(state.createdAt)}</Typography>
            <Grid container mt={1}>
                <Typography>{state.body}</Typography>
            </Grid>
        </Grid>

    return (
        <Card sx={{boxShadow: 3}}>
            <CardContent>
                {content}
            </CardContent>
        </Card>
    )
}

export default CommentCard