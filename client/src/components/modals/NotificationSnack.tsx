import { SLIDE_DOWN_TRANSITION } from '../util/Constants';
import { Alert, Snackbar } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from 'src/context/auth';

/**
 * Reports messages received from the server
 * @returns SnackBar
 */
const NotificationSnack = () => {
    const auth = useContext(AuthContext)
    return (
        <div>
            <Snackbar
                open={auth.isMsg()}
                TransitionComponent={SLIDE_DOWN_TRANSITION}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                autoHideDuration={5000}
                onClose={() => auth.clearError()}
            >
                <Alert severity={auth.isLoggedIn() ? 'success' : 'error'}>{auth.getMsg()}</Alert>
            </Snackbar>
        </div>
    );
}

export default NotificationSnack