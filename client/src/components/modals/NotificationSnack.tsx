import { SLIDE_DOWN_TRANSITION } from '../util/Constants';
import { Alert, Snackbar } from '@mui/material';
import { useContext } from 'react';
import { SnackContext } from 'src/context/snack';

/**
 * Reports messages received from the server
 * @returns SnackBar
 */
const NotificationSnack = () => {
    const snack = useContext(SnackContext)
    return (
        <div>
            <Snackbar
                open={snack.open()}
                TransitionComponent={SLIDE_DOWN_TRANSITION}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                autoHideDuration={5000}
                onClose={() => snack.clearMessage()}
            >
                <Alert severity={snack.getSeverity()}>{snack.getMessage()}</Alert>
            </Snackbar>
        </div>
    );
}

export default NotificationSnack