import { Grid, Typography } from "@mui/material"
import { Link } from 'react-router-dom';
import AccountButton from '../button/AccountButton';

/**
 * Represents the toolbar's items of a logged out in user
 * 
 * @author Michael Campos
 */
const WelcomeMenu = () => {
    return (
        <Grid container alignItems='center'>
            <Grid item flexGrow={1}>
                <Typography
                    variant="h6"
                    noWrap
                    component='div'
                    >
                        <Link style={{ textDecoration: 'none', color: 'white' }} to='/'>TileTown</Link>
                    </Typography>
            </Grid>
            <AccountButton loggedIn={false}/>
        </Grid>
    )
}

export default WelcomeMenu