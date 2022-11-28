import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { SocialContext } from "src/context/social"
import { ContestContext } from "src/context/social/contest"
import UserProfileCard from "../card/UserProfileCard"
import UserProfileBox from "../UserProfileBox"
import { SLIDE_DOWN_TRANSITION } from "../util/Constants"
import { calcTimeLeft, dateToStr } from "../util/DateUtils"

const ContestViewerModal = () => {
    const social = useContext(SocialContext)
    const contest = useContext(ContestContext)
    const [user, setUser] = useState({
        userId: '',
        firstName: '',
        lastName: '',
        username: ''
    })
    let c = contest.state.currentContest
    useEffect(() => {
        if (c) {
            social.getUserById(c.owner).then(u => {
                if (u) {
                    setUser({
                        userId: u.id,
                        firstName: u.firstName,
                        lastName: u.lastName,
                        username: u.username
                    })
                }
            })
        }
    }, [contest.state.currentContest])
    const open = Boolean(contest.state.currentContest)
    let content = <div></div>
    if (c) {
        const startDate = new Date(c.startDate)
        const endDate = new Date(c.endDate)
        const timeLeft = calcTimeLeft(endDate)
        content = (
            <Grid container spacing={1}>
                <Grid container item>
                    <UserProfileBox 
                        firstName={user.firstName}
                        lastName={user.lastName}
                        username={user.username}
                    />
                </Grid>
                <Grid item flexGrow={1}>
                    <Typography><b>Started:&ensp;</b>
                        {`${dateToStr(startDate)} ${startDate.toLocaleTimeString()}`}
                    </Typography>
                </Grid>
                <Grid item>
                    <Card sx={{borderRadius: 3, pl: 2, pr: 2, bgcolor: 'secondary.main', color: 'white'}}>
                        <Typography>{timeLeft}</Typography>
                    </Card>
                </Grid>
                <Grid container item>
                    <Grid item>
                        <Typography><b>Ends:&ensp;</b>
                            {`${dateToStr(endDate)} ${endDate.toLocaleTimeString()}`}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item>
                    <Typography><b>Participates</b>&ensp;{c.participates.length}</Typography>
                </Grid>
                <Grid container item>
                    <Typography>{c.description}</Typography>
                </Grid>
            </Grid>
        )
    }
    let controls = (
        <Button>Start</Button>
    )
    return (
        <Dialog 
            open={open} 
            onClose={() => contest.clear()}
            TransitionComponent={SLIDE_DOWN_TRANSITION}
        >
            <DialogTitle>{contest.state.currentContest?.name}</DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions>
                {controls}
            </DialogActions>
        </Dialog>
    )
}

export default ContestViewerModal