import { Box, Card, CardContent, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import UserProfileBox from "../UserProfileBox"
import { parseDateToPostedStr } from "../util/DateUtils"
import { useContext } from "react"
import { SocialContext } from "src/context/social"

interface Props {
    commentId: string
}

const CommentCard = (props: Props) => {
    const social = useContext(SocialContext)
    useEffect(() => {
        social.getCommentById(props.commentId).then(data => {
            let comment = data.comment
            let user = data.user
            if (comment && user) {
                setState({
                    createdAt: new Date(comment.createdAt),
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    body: comment.body
                })
            }
        })
    }, [])
    const [state, setState] = useState({
        createdAt: new Date(),
        username: '',
        firstName: '',
        lastName: '',
        body: ''
    })

    let content = 
        <Grid container alignItems={'center'}>
            <UserProfileBox
                firstName={state.firstName}
                lastName={state.lastName}
                username={state.username}
            />
            <Box flexGrow={1}/>
            <Typography>{parseDateToPostedStr(state.createdAt)}</Typography>
            <Grid container mt={1}>
                <Typography>{state.body}</Typography>
            </Grid>
        </Grid>

    return (
        <Card sx={{mt: 1, boxShadow: 3}}>
            <CardContent>
                {content}
            </CardContent>
        </Card>
    )
}

export default CommentCard