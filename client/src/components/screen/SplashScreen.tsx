import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'

const SplashScreen = () => {
    return (
        <Fade in={true} timeout={1000} children={
            <Box pt={8} id='splash-screen'>
                <Box id='title'></Box>
            </Box>
        }></Fade>
    )
}

export default SplashScreen