import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { SLIDE_DOWN_TRANSITION } from '../util/Constants';
import { ModalContext } from 'src/context/modal';
import { SocialContext } from 'src/context/social';
import { SnackContext } from 'src/context/snack';

const CreateContestModal = () => {
    const modal = useContext(ModalContext)
    const social = useContext(SocialContext)
    const snack = useContext(SnackContext)
    const handleClose = () => {
        setContest({name: '', desc: '', endDate: new Date()})
        modal.close()
    }
    const [contest, setContest] = useState({
        name: '',
        desc: '',
        endDate: new Date()
    })
    console.log(contest.endDate)
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContest({
            name: e.target.value,
            desc: contest.desc,
            endDate: contest.endDate

        })
    }
    const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContest({
            name: contest.name,
            desc: e.target.value,
            endDate: contest.endDate

        })
    }
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContest({
            name: contest.name,
            desc: contest.desc,
            endDate: new Date(e.target.value)
        })
    }
    const handleCreate = () => {
        social.createContest(contest.name, contest.desc, contest.endDate, snack)
        modal.close()
    }

    let btDisabled = true
    if (contest.name && contest.desc) {
        btDisabled = false
    }
    let ui = (
        <Dialog 
            open={modal.getModal().showCreateContestModal} 
            onClose={handleClose}
            TransitionComponent={SLIDE_DOWN_TRANSITION}
        >
            <DialogTitle>Create Contest</DialogTitle>
                <DialogContent>
                <TextField
                    onChange={handleNameChange}
                    variant='outlined'
                    margin='dense'
                    required
                    fullWidth
                    label="Name"
                    autoFocus
                />
                <TextField
                    onChange={handleDescChange}
                    variant='outlined'
                    margin='dense'
                    required
                    fullWidth
                    label="Description"
                    multiline
                    rows={7}
                />
                <Grid container spacing={1} margin='dense'>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            margin='normal'
                            fullWidth
                            label="Theme"
                            defaultValue="Any"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Stack component="form" noValidate spacing={3}>
                            <TextField
                                required
                                margin='normal'
                                label="Due Date"
                                type="date"
                                defaultValue="2022-12-31"
                                onChange={handleDateChange}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Stack>
                    </Grid>
                </Grid>
                </DialogContent>
            <DialogActions>
                <Button
                    disabled={btDisabled}
                    onClick={handleCreate}
                    type="submit">
                    Create Contest
                </Button>
            </DialogActions>
        </Dialog>
    )
    return (
        <div>
            {ui}
        </div>
    )

}

export default CreateContestModal