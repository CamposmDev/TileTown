import { Grid, Typography } from "@mui/material"
import { useContext } from "react"
import { Link as RouterLink } from "react-router-dom"
import { AuthContext } from "src/context/auth"
import AccountButton from "../button/AccountButton"
import CreateButton from "../button/CreateButton"
import NavDrawer from "../NavDrawer"

/**
 * Represents the toolbar's items of a logged in user
 * 
 * @author Michael Campos
 */
const UserMenu = () => {
    const auth = useContext(AuthContext)
    // let editorBreadcrumb = 
    //     <Breadcrumbs color="white" separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb">
    //         <Link underline="none" color="white">Camposm</Link>
    //         <Link underline="none" color="white">Tilesets</Link>
    //         <Link underline="none" color="white">New Tile Set</Link>
    //     </Breadcrumbs>


    return (
        <Grid container alignItems='center'>
            <Grid item mr={1}>
                <NavDrawer/>
            </Grid>
            <Grid item mr={5} flexGrow={1}>
                <Typography
                    variant="h6"
                    noWrap
                    component='div'
                    >
                        <RouterLink style={{ textDecoration: 'none', color: 'white' }} to='/home'>TileTown</RouterLink>
                    </Typography>
            </Grid>
            {/* <Grid item flexGrow={1}>
                {editorBreadcrumb}
            </Grid> */}
            <CreateButton disabled={auth.isGuest()} />
            <AccountButton />
        </Grid>
    )
}

export default UserMenu