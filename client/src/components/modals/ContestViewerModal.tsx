import { AppBar, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Toolbar, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "src/context/auth"
import { ModalContext } from "src/context/modal"
import { SnackContext } from "src/context/snack"
import { SocialContext } from "src/context/social"
import { ContestContext } from "src/context/social/contest"
import User from "../../../../@types/User"
import TilemapSocialCardLoader from "../card/TilemapSocialCardLoader"
import TilesetSocialCardLoader from "../card/TilesetSocialCardLoader"
import UserProfileBox from "../UserProfileBox"
import { SLIDE_DOWN_TRANSITION } from "../util/Constants"
import { calcTimeLeft, dateToStr, isExpired } from "../util/DateUtils"

function toTitleCase(str: string) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
      }
    );
  }

function ContestSubmissionViewerModal(props: 
    {
        open: boolean
        owner: {
            userId: string,
            firstName: string,
            lastName: string,
            username: string
        }
    }) {
    const auth = useContext(AuthContext)
    const contest = useContext(ContestContext)
    const snack = useContext(SnackContext)
    const social = useContext(SocialContext)
    const [socialIds, setSocialIds] = useState<string[]>([])
    const [winner, setWinner] = useState<User>()
    let c = contest.state.currentContest
    let loggedUsr = auth.usr
    useEffect(() => {
        if (c) {
            if (c.winner) {
                social.getUserById(c.winner).then(usr => {
                    if (usr) setWinner(usr)
                })
            }
            if (c.type === 'tilemap') {
                contest.getTilemapSubmissions().then(arr => {
                    setSocialIds(arr)
                })
            } else if (c.type === 'tileset') {
                contest.getTilesetSubmissions().then(arr => {
                    setSocialIds(arr)
                })
            }
        }
    }, [contest.state.currentContest, auth.usr])
    if (!c) return <div/>
    
    const selectWinner = async (socialId: string) => {
        if (!c) return
        switch (c.type) {
            case 'tilemap':
                let tms = await social.getTilemapSocialById(socialId)
                if (tms) {
                    contest.selectWinner(c.id, tms.owner, snack)
                }
                break
            case 'tileset':
                let tss = await social.getTilesetSocialById(socialId)
                if (tss) {
                    contest.selectWinner(c.id, tss.owner, snack)
                }
                break
        }
    }

    let content: JSX.Element | JSX.Element[] = <div/>
    switch (c.type) {
        case 'tilemap':
            content = socialIds.map(id =>
                <Grid item key={id}>
                    {(loggedUsr && loggedUsr.id === c?.owner) ? <Button fullWidth onClick={() => selectWinner(id)}>Set as Winner</Button> : <div/>}
                    <TilemapSocialCardLoader tmsId={id}/>
            </Grid>)
            break
        case 'tileset':
            content = socialIds.map(id => <Grid item key={id}>
                {(loggedUsr && loggedUsr.id === c?.owner) ? <Button fullWidth onClick={() => selectWinner(id)}>Set as Winner</Button> : <div/>}
                <TilesetSocialCardLoader tssId={id}/>
            </Grid>)
            break
    }

    let winnerStr = winner ? `(${winner.username} is the winner!)` : ''

    return (
        <Dialog open={props.open} fullScreen TransitionComponent={SLIDE_DOWN_TRANSITION} onClose={() => contest.clear()}>
            <AppBar position="relative">
                <Toolbar>
                    <Typography mr={1}>{c.name}</Typography>
                    <Typography flexGrow={1}>{winnerStr}</Typography>
                    <Button color='inherit' onClick={() => contest.clear()}>Close</Button>
                </Toolbar>
            </AppBar>
            <Grid container p={1}>
                {socialIds.length === 0 ? <Typography>{`No one submitted for your contest :( Better luck next time!`}</Typography> : <div/>}
                {content}
            </Grid>
        </Dialog>
    )
}

export default function ContestViewerModal() {
    const auth = useContext(AuthContext)
    const social = useContext(SocialContext)
    const contest = useContext(ContestContext)
    const modal = useContext(ModalContext)
    const snack = useContext(SnackContext)
    const [user, setUser] = useState({
        userId: '',
        firstName: '',
        lastName: '',
        username: ''
    })
    const [submitted, setSubmitted] = useState<boolean>(false)
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
            if (auth.usr?.id !== c.owner) {
                social.hasContestSubmission(c.id).then(submitted => {
                    setSubmitted(submitted)
                })
            }
        }
    }, [contest.state.currentContest, auth.usr])

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
        if (c?.type === 'tilemap') {
            throw new Error('TODO')
            // modal.showUploadTilemapModal()
        } else if (c?.type === 'tileset') {
            modal.showUploadTilesetModal()
        }
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
        const timeLeft: string = calcTimeLeft(endDate)
        const isOver: boolean = isExpired(endDate)
        /** If the contest is over, show submissions as a full screen */
        if (isOver) {
            return <ContestSubmissionViewerModal
                open={open}
                owner={{
                    userId: user.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username
                }}
            />
        }
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
                    <Grid item>
                        <Typography><b>Theme:</b>&ensp;
                            {toTitleCase(c.type)}
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
    let firstControl = <Typography>Come back later when the contest is over to decide the winner!</Typography>
    let secondControl = <div/>
    let usr = auth.usr
    if (usr && c) {
        if (usr.id === c.owner) {
            let endDate = new Date(c.endDate)
            if (isExpired(endDate)) {
                firstControl = chooseWinnerButton
            }
        } else {
            if (c.participates.indexOf(usr.id) === -1) {
                // The user is not a member of the contest
                firstControl = joinButton
            } else {
                if (submitted) {
                    firstControl = <Typography>You've submitted your work! Come back later to see the results!</Typography>
                } else {
                    firstControl = leaveButton
                }
            }
        }
    }

    secondControl = firstControl === leaveButton ? startButton : <div/>
    if (submitted) secondControl = <div/>
    
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
                {firstControl}
                {secondControl}
            </DialogActions>
        </Dialog>
    )
}