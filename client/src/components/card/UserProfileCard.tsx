import { MoreVert } from "@mui/icons-material";
import { Box, Card, CardActionArea, CardContent, IconButton, Menu, MenuItem, Stack } from "@mui/material"
import { useContext, useState } from "react";
import { AuthContext } from "src/context/auth";
import { SnackContext } from "src/context/snack";
import { SocialContext } from "src/context/social";
import UserProfileBox from "../UserProfileBox";
import { MENU_PAPER_PROPS } from "../util/Constants";


interface Props {
    firstName: string,
    lastName: string,
    username: string,
    fancy?: boolean
}

const UserProfileCard = (props: Props) => {
    const auth = useContext(AuthContext)
    const social = useContext(SocialContext)
    const snack = useContext(SnackContext)
    const [anchorEl, setAnchorEl] = useState(null)
    const handleMenuOpen = (e: any) => setAnchorEl(e.currentTarget)
    const handleMenuClose = () => setAnchorEl(null)
    const open = Boolean(anchorEl)

    const removeFriend = () => {
        console.log(props.username)
        social.removeFriend(props.username, auth, snack)
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
            <MenuItem onClick={removeFriend}>Remove Friend</MenuItem>
        </Menu>
    )

    let minimal = 
        <div>
            {menu}
            <Card sx={{p: 1}}>
                <Stack direction='row' alignItems='center'>
                    <UserProfileBox 
                        firstName={props.firstName}
                        lastName={props.lastName}
                        username={props.username}
                    />
                    <Box flexGrow={1}/>
                    <IconButton onClick={handleMenuOpen} children={<MoreVert/>}/>
                </Stack>
            </Card>
        </div>
        
    let fancy = 
        <Card><CardActionArea>
            <CardContent>
            
            <UserProfileBox
                firstName={props.firstName}
                lastName={props.lastName}
                username={props.username}
                fancy={props.fancy}
            />
            

            </CardContent>
            </CardActionArea>
        </Card>
    return props.fancy ? fancy : minimal
}

export default UserProfileCard