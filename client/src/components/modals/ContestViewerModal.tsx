import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "src/context/auth"
import { SnackContext } from "src/context/snack"
import { SocialContext } from "src/context/social"
import { ContestContext } from "src/context/social/contest"
import UserProfileBox from "../UserProfileBox"
import { SLIDE_DOWN_TRANSITION } from "../util/Constants"
import { calcTimeLeft, dateToStr, isExpired } from "../util/DateUtils"

const ContestViewerModal = () => {
    const auth = useContext(AuthContext)
    const social = useContext(SocialContext)
    const contest = useContext(ContestContext)
    const snack = useContext(SnackContext)
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

    const join = () => {
        /** Call the join function from contest store */
        if (c) contest.joinContest(c.id, snack).then(usr => {
            if (usr) auth.refreshUser(usr)
        })
    }

    const leave = () => {
        /** Call the leave function from contest store */
        if (c) contest.leaveContest(c.id, snack).then(usr => {
            if (usr) auth.refreshUser(usr)
        })
    }

    /**
     * SIDE NOTE
     * - It would be epic that once the contest is over, the modal will change to a full screen 
     * modal where it will display the tileset/tilemap submissions from other users
     */

    /** 
     * Only the participant can do this (not the owner)
     * When the user clicks the start button:
     *  - the appropiate (tileset/tilemap) create modal should show up where the user can start 
     * working on their creation. 
     *  
     */
    const start = () => {
        
    }

    /** 
     * Only the owner of the contest can do this
     * When the owner clicks the choose winner button, the owner will be promoted to enter the username of the winner
     * Press 'Enter' and the back-end will validate if the entered username is indeed part of this contest
     */
    const chooseWinner = () => {
        
    }

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
                    <Card sx={{borderRadius: 3, pl: 2, pr: 2, bgcolor: 'primary.main', color: 'white'}}>
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
    let joinButton = <Button onClick={join}>Join</Button>
    let leaveButton = <Button onClick={leave}>Leave</Button>
    let startButton = <Button onClick={start}>Start</Button>
    let chooseWinnerButton = <Button onClick={chooseWinner}>Choose Winner</Button>
    let theControl = <Typography>Come back later to decide the winner!</Typography>
    let usr = auth.usr
    if (usr && c) {
        if (usr.id === c.owner) {
            let endDate = new Date(c.endDate)
            if (isExpired(endDate)) {
                theControl = chooseWinnerButton
            }
        } else {
            if (c.participates.indexOf(usr.id) === -1) {
                theControl = joinButton
            } else {
                theControl = leaveButton
            }
        }
    }
    
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
                {theControl}
                {(theControl === leaveButton) ? startButton : <div/>}
            </DialogActions>
        </Dialog>
    )
}

export default ContestViewerModal