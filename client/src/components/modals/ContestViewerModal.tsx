import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { SocialContext } from "src/context/social"
import { ContestContext } from "src/context/social/contest"
import UserProfileCard from "../card/UserProfileCard"
import UserProfileBox from "../UserProfileBox"
import { SLIDE_DOWN_TRANSITION } from "../util/Constants"
import { calcTimeLeft, parseDateToStr } from "../util/DateUtils"

const ContestViewerModal = () => {
    const social = useContext(SocialContext)
    const contest = useContext(ContestContext)
    const [user, setUser] = useState({
        userId: '',
        firstName: '',
        lastName: '',
        username: ''
    })
    let c = contest.getCurrentContest()
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
    }, [contest.getCurrentContest()])
    const open = Boolean(contest.getCurrentContest())
    let content = <div></div>
    if (c) {
        const timeLeft = calcTimeLeft(new Date(c.startDate), new Date(c.endDate))
        content = (
            <Grid container spacing={1}>
                <Grid container item>
                    <UserProfileBox 
                        firstName={user.firstName}
                        lastName={user.lastName}
                        username={user.username}
                    />
                </Grid>
                <Grid item>
                    <Typography><b>Started:&ensp;</b>
                        {parseDateToStr(new Date(c.startDate))}
                    </Typography>
                </Grid>
                <Grid item>
                    <Card sx={{borderRadius: 3, pl: 2, pr: 2, bgcolor: 'secondary.main', color: 'white'}}>
                        <Typography>{timeLeft}</Typography>
                    </Card>
                </Grid>
                <Grid container item>
                    <Typography><b>Participates</b>&ensp;{c.participates.length}</Typography>
                </Grid>
                <Grid container item>
                    <Card sx={{bowShadow: 3}}>
                        <CardContent>
                        <Typography>{c.description}</Typography>
                        </CardContent>
                    </Card>
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
            <DialogTitle>{contest.getCurrentContest()?.name}</DialogTitle>
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