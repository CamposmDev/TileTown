import { Box, Card, CardActionArea, CardContent, Grid, Stack, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { SocialContext } from "src/context/social"
import { parseDateToStr, calcTimeLeft } from '../util/DateUtils'

interface Props {
    payload: {
        contestName: string,
        startDate: Date,
        endDate: Date,
        owner: string
        contestTheme: string
        numOfParticipates: number
    }
}

const ContestCard = (props: Props) => {
    const social = useContext(SocialContext)
    const [user, setUser] = useState({
        userId: '',
        firstName: '',
        lastName: '',
        username: ''
    })    
    const timeLeft = calcTimeLeft(props.payload.startDate, props.payload.endDate)
    useEffect(() => {
        social.getUserById(props.payload.owner).then(u => {
            if (u) {
                setUser({
                    userId: u.id,
                    firstName: u.firstName,
                    lastName: u.lastName,
                    username: u.username
                })
            }
        })
    }, [])
    return (
            <Card>
                <CardActionArea>
                    <CardContent>
                        <Typography>{props.payload.contestName}</Typography>
                        <Grid container direction='row'>
                            <Stack direction='column' mr={1}>
                                <Card sx={{borderRadius: 3, pl: 1, pr: 1, bgcolor: 'secondary.main', color: 'white'}}>
                                    <Typography variant='caption'>{timeLeft}</Typography>
                                </Card>
                                <Box flexGrow={1}/>
                                <Typography variant='caption'><b>By</b>:&ensp;{user.username}</Typography>
                            </Stack>
                            <Box flexGrow={1}/>
                            <Stack direction='column'>
                                {/* <Typography variant='caption'>
                                    <b>Theme</b>:&ensp;{props.payload.contestTheme}
                                </Typography> */}
                                <Typography variant='caption'><b>Started:&ensp;</b>
                                    {parseDateToStr(props.payload.startDate)}
                                </Typography>
                                <Typography variant='caption'>
                                    <b>{props.payload.numOfParticipates.toFixed(0)}</b>&ensp;Participates
                                </Typography>
                            </Stack>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
    )
}

export default ContestCard