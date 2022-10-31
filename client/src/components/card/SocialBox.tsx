import { Stack, Typography } from '@mui/material'
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
    bgcolor: 'secondary.main',
    borderRadius: 3,
    paddingLeft: 1,
    paddingRight: 1,
}

const SocialBox = (props: Props) => {
    return (
        <Stack className='tile-social-statistics-card' spacing={0.5}>
            <Stack direction='row' sx={cardStyle} spacing={0.5}>
                <Visibility fontSize="small" />
                <Typography variant="caption">{formatToSocialStr(props.views)}</Typography>
                </Stack>
            <Stack direction='row' sx={cardStyle} spacing={0.5}>
                <Comment fontSize="small"/>
                <Typography variant="caption">{formatToSocialStr(props.comments)}</Typography>
            </Stack>
            <Stack direction='row' sx={cardStyle} spacing={0.5}>
                <ThumbUp fontSize="small"/>
                <Typography variant="caption">{formatToSocialStr(props.likes)}</Typography>
            </Stack>
        </Stack>
    )
}

export default SocialBox