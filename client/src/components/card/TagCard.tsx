import { Card, Typography } from "@mui/material"

interface Props {
    name: string
}

const TagCard = (props: Props) => {
    return (
        <Card sx={{borderRadius: 3, pr: 2, pl: 2, boxShadow: 3}}>
            <Typography>{props.name}</Typography>
        </Card>
    )
}

export default TagCard