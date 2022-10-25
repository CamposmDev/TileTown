import { Box } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router"

const WelcomeMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const navigate = useNavigate()
    const open = Boolean(anchorEl)

    const handleProfileMenuOpen = (event: any) => setAnchorEl(event.currentTarget)

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleGuest = () => {
        navigate('/')
        // auth.loginAsGuest()
        handleMenuClose()
    }
    return (
        <Box></Box>
    )
}

export default WelcomeMenu