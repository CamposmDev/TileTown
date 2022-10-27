import { MoreVert } from "@mui/icons-material";
import { Avatar, Card, CardContent, IconButton, Stack, Typography } from "@mui/material"
import { useState } from "react";

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}
  
function stringAvatar(firstName: string, lastName: string) {
    return {
        sx: {
        bgcolor: stringToColor(firstName + ' ' + lastName),
        },
        children: `${firstName[0]}${lastName[0]}`,
    };
}

interface Props {
    firstName: string,
    lastName: string,
    username: string,
}

const FriendCard = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Card sx={{p: 1}}>
            <Stack direction='row' alignItems='center' spacing={1}>
                <Avatar {...stringAvatar(props.firstName, props.lastName)}/>
                <Typography>{props.username}</Typography>
                <IconButton children={<MoreVert/>}/>
            </Stack>
        </Card>
    )
}

export default FriendCard