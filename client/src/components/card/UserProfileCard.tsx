import { MoreVert } from "@mui/icons-material";
import { Box, Card, CardActionArea, CardContent, IconButton, Stack } from "@mui/material"
import UserProfileBox from "../UserProfileBox";


interface Props {
    firstName: string,
    lastName: string,
    username: string,
    fancy?: boolean
}

const UserProfileCard = (props: Props) => {
    let minimal = 
        <Card sx={{p: 1}}>
                <Stack direction='row' alignItems='center'>
                    <UserProfileBox 
                        firstName={props.firstName}
                        lastName={props.lastName}
                        username={props.username}
                    />
                    <Box flexGrow={1}/>
                    <IconButton children={<MoreVert/>}/>
                </Stack>
            </Card>
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