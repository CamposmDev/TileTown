import { SLIDE_DOWN_TRANSITION } from '../util/Constants';
import { Alert, Snackbar } from '@mui/material';

interface Props {
    show: boolean,
    message: string,
    handleClose: Function
}

export default function ErrorSnack(props: Props) {
    return (
        <div>
            <Snackbar
                open={props.show}
                TransitionComponent={SLIDE_DOWN_TRANSITION}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                autoHideDuration={5000}
                onClose={() => props.handleClose()}
                message={props.message}
            >
                <Alert severity='error'>{props.message}</Alert>
            </Snackbar>
        </div>
    );
}