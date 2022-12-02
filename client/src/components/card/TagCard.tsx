import { Chip } from "@mui/material"

const TagCard = (props: { name: string }) => {
    return (
        <Chip variant='outlined' label={props.name} />
    )
}

export default TagCard