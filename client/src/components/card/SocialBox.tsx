import { Chip, Stack, StackProps, Typography } from '@mui/material'
import { Visibility, Comment, ThumbUp } from '@mui/icons-material'
import { formatToSocialStr } from '../util/NumberUtils'
import './default.css'

interface Props {
    views: number,
    comments: number
    likes: number
}

const cardStyle = {
    alignItems: 'center',
    alignContent: 'center',
    bgcolor: 'rgb(0,0,0,0.6)',
    borderRadius: 3,
    paddingLeft: 1,
    paddingRight: 1,
    boxShadow: 3
}

const SocialBox = (props: Props) => {
    let stackProps: StackProps = {
        direction: 'row',
        sx: cardStyle,
        spacing: 0.5
    }
    return (
        <Stack className='tile-social-statistics-card' spacing={0.5}>
            <Stack {...stackProps}>
                <Visibility fontSize="small" />
                <Typography variant="caption">{formatToSocialStr(props.views)}</Typography>
                </Stack>
            <Stack {...stackProps}>
                <Comment fontSize="small"/>
                <Typography variant="caption">{formatToSocialStr(props.comments)}</Typography>
            </Stack>
            <Stack {...stackProps}>
                <ThumbUp fontSize="small"/>
                <Typography variant="caption">{formatToSocialStr(props.likes)}</Typography>
            </Stack>
        </Stack>
    )
}

export default SocialBox