import { Grid, Typography, Stack, Button } from "@mui/material"
import ChangeEmailModal from "../../modals/ChangeEmailModal"

interface Props {
    title: string,
    content: string,
    value: string
    button: JSX.Element
}

const EditUserPropertyForm = (props: Props) => {
    return (
        <Stack direction='column'>
            <Typography variant="body1"><b>{props.title}</b></Typography>
            <Stack direction='row' alignItems={'center'} spacing={1}>
                <Typography variant="body1" flexGrow={1}>{props.content}&ensp;<b>{props.value}</b></Typography>
                {props.button}
            </Stack>
        </Stack>
    )
}

export default EditUserPropertyForm