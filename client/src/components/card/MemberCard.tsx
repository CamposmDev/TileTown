import { MoreVert } from "@mui/icons-material";
import { Card, IconButton, Menu, MenuItem } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { SocialContext } from "src/context/social";
import { CommunityContext } from "src/context/social/community";
import UserProfileBox from "../UserProfileBox";
import { MENU_PAPER_PROPS } from "../util/Constants";

export default function MemberCard(props: {usrId: string}) {
    const social = useContext(SocialContext)
    const comm = useContext(CommunityContext)
    const nav = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const [state, setState] = useState({
        id: '',
        username: '',
        firstName: '',
        lastName: ''
    })
    useEffect(() => {
        social.getUserById(props.usrId).then(usr => {
            if (usr) {
                setState({
                    id: usr.id,
                    username: usr.username,
                    firstName: usr.firstName,
                    lastName: usr.lastName
                })
            }
        })
    }, [props.usrId])
    const handleMenuOpen = (e: any) => setAnchorEl(e.currentTarget)
    const handleMenuClose = () => setAnchorEl(null)
    const viewProfile = () => {
        nav(`/profile/${state.id}`)
        handleMenuClose()
    }
    const menu = (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={MENU_PAPER_PROPS}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={viewProfile}>View Profile</MenuItem>
        </Menu>
    )

    let c = comm.currCommunity
    let username = state.username
    if (c && c.owner === props.usrId) {
        username = `${username} (Owner)`
    }

    let profileBox = 
        <UserProfileBox
            firstName={state.firstName}
            lastName={state.lastName}
            username={username}
        />
    return (
        <Box>
            {menu}
            <Card sx={{p: 1, boxShadow: 3}}>
                <Stack direction='row' alignItems='center'>
                    {profileBox}
                    <Box flexGrow={1}/>
                    <IconButton onClick={handleMenuOpen} children={<MoreVert/>}/>
                </Stack>
            </Card>
        </Box>
    )
}