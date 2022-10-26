import { Grid, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import AccountButton from "../button/AccountButton"
import CreateButton from "../button/CreateButton"
import NavDrawer from "../NavDrawer"

/**
 * Represents the toolbar's items of a logged in user
 * 
 * @author Michael Campos
 */
const UserMenu = () => {
    return (
        <Grid container alignItems='center'>
            <Grid item mr={1}>
                <NavDrawer/>
            </Grid>
            <Grid item flexGrow={1}>
                <Typography
                    variant="h6"
                    noWrap
                    component='div'
                    >
                        <Link style={{ textDecoration: 'none', color: 'white' }} to='/feed'>TileTown</Link>
                    </Typography>
            </Grid>
            <CreateButton/>
            <AccountButton loggedIn={true}/>
        </Grid>
    )
}

export default UserMenu