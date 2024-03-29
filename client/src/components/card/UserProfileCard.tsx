import { MoreVert } from "@mui/icons-material";
import { Box, Card, CardActionArea, CardContent, Fade, IconButton, Menu, MenuItem, Stack } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "src/context/auth";
import { SnackContext } from "src/context/snack";
import { SocialContext } from "src/context/social";
import UserProfileBox from "../UserProfileBox";
import { MENU_PAPER_PROPS } from "../util/Constants";


interface Props {
    userId: string,
    fancy?: boolean
    minimal?: boolean
}

const UserProfileCard = (props: Props) => {
    const [state, setState] = useState({
        userId: '',
        firstName: '',
        lastName: '',
        username: ''
    })
    const auth = useContext(AuthContext)
    const social = useContext(SocialContext)
    const snack = useContext(SnackContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const nav = useNavigate()
    const handleMenuOpen = (e: any) => setAnchorEl(e.currentTarget)
    const handleMenuClose = () => setAnchorEl(null)
    const open = Boolean(anchorEl)

    useEffect(() => {
        social.getUserCredentialsById(props.userId).then(u => {
            if (u) {
                setState({
                    userId: props.userId,
                    firstName: u.firstName,
                    lastName: u.lastName,
                    username: u.username
                })
            }
        })
    }, [])
    let profileBox = 
        <UserProfileBox
            firstName={state.firstName}
            lastName={state.lastName}
            username={state.username}
        />
    /** If minimal, then return a profile box */
    if (props?.minimal) return profileBox

    const viewProfile = () => {
        nav(`/profile/${state.userId}`)
        handleMenuClose()
    }

    const removeFriend = () => {
        social.removeFriend(state.userId, auth, snack)
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
            <MenuItem onClick={removeFriend}>Remove Friend</MenuItem>
        </Menu>
    )

    let minimal = 
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
        
    let fancy = 
        <Fade in={true} timeout={1000}>
        <Card onClick={() => {
            nav(`/profile/${state.userId}`)
        }}>
            <CardActionArea>
                <CardContent>
                    <UserProfileBox
                        firstName={state.firstName}
                        lastName={state.lastName}
                        username={state.username}
                        fancy={props.fancy}
                    />
                </CardContent>
            </CardActionArea>
        </Card>
        </Fade>
    return props.fancy ? fancy : minimal
}

export default UserProfileCard