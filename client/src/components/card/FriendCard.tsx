import { MoreVert } from "@mui/icons-material";
import { Box, Card, IconButton, Stack } from "@mui/material"
import ProfileBox from "../ProfileBox";


interface Props {
    firstName: string,
    lastName: string,
    username: string,
}

const FriendCard = (props: Props) => {
    return (
        <Card sx={{p: 1}}>
            <Stack direction='row' alignItems='center' spacing={1}>
                <ProfileBox 
                    firstName={props.firstName}
                    lastName={props.lastName}
                    username={props.username}
                />
                <Box flexGrow={1}/>
                <IconButton children={<MoreVert/>}/>
            </Stack>
        </Card>
    )
}

export default FriendCard