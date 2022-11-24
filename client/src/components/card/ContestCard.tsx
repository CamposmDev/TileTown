import { Box, Card, CardActionArea, CardContent, Grid, Stack, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { SocialContext } from "src/context/social"
import { ContestContext } from "src/context/social/contest"
import Contest from "../../../../@types/Contest"
import { parseDateToStr, calcTimeLeft } from '../util/DateUtils'

interface Props {
    c: Contest
}

const ContestCard = (props: Props) => {
    const social = useContext(SocialContext)
    const contest = useContext(ContestContext)
    const [user, setUser] = useState({
        userId: '',
        firstName: '',
        lastName: '',
        username: ''
    })
    const timeLeft = calcTimeLeft(new Date(props.c.startDate), new Date(props.c.endDate))
    useEffect(() => {
        social.getUserById(props.c.owner).then(u => {
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
    const handleClick = () => {
        contest.viewContest(props.c)
    }
    return (
        <Card onClick={handleClick} sx={{boxShadow: 3}}>
            <CardActionArea>
                <CardContent>
                    <Typography>{props.c.name}</Typography>
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
                            <Typography variant='caption'><b>Started:&ensp;</b>
                                {parseDateToStr(new Date(props.c.startDate))}
                            </Typography>
                            <Typography variant='caption'>
                                <b>{props.c.participates.length}</b>&ensp;Participates
                            </Typography>
                        </Stack>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ContestCard