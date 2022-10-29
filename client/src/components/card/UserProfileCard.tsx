import { MoreVert } from "@mui/icons-material";
import { Box, Card, IconButton, Stack } from "@mui/material"
import UserProfileBox from "../UserProfileBox";


interface Props {
    firstName: string,
    lastName: string,
    username: string,
}

const UserProfileCard = (props: Props) => {
    return (
        <Card sx={{p: 1}}>
            <Stack direction='row' alignItems='center' spacing={1}>
                <UserProfileBox 
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

export default UserProfileCard