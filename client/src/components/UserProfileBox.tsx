import { Avatar, Stack, Typography } from "@mui/material"
import { stringAvatar } from "./util/Constants"

interface Props {
    firstName: string,
    lastName: string,
    username: string,
    fancy?: boolean
    size?: string
}

const UserProfileBox = (props: Props) => {
    if (props.fancy) {
        return (
            <Stack direction='column' alignItems='center' spacing={1}>
                <Avatar style={{fontSize: '28pt', width: 100, height: 100}} {...stringAvatar(props.firstName, props.lastName)}/>
                <Typography variant="h6" flexGrow={1}>{props.username}</Typography>
            </Stack>
        )
    }
    if (props.size?.localeCompare('profile') === 0) {
        return <Stack direction='row' alignItems='center' spacing={1}>
        <Avatar style={{fontSize: '32pt', width: 100, height: 100}} {...stringAvatar(props.firstName, props.lastName)}/>
        <Typography variant="h5" flexGrow={1}>{props.username}</Typography>
    </Stack>
    }
    return (
        <Stack direction='row' alignItems='center' spacing={1}>
            <Avatar {...stringAvatar(props.firstName, props.lastName)}/>
            <Typography flexGrow={1}>{props.username}</Typography>
        </Stack>
    )
}

export default UserProfileBox