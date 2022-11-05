import { SLIDE_DOWN_TRANSITION } from '../util/Constants';
import { Alert, Snackbar } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from 'src/context/auth';

/**
 * 
 * @returns SnackBar as Error Feedback
 */
const ErrorSnack = () => {
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
                <Alert severity='error'>{auth.getMsg()}</Alert>
            </Snackbar>
        </div>
    );
}

export default ErrorSnack