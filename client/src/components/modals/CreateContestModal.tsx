import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import { SLIDE_DOWN_TRANSITION } from '../util/Constants';
import { ModalContext } from 'src/context/modal';
import { SocialContext } from 'src/context/social';
import { SnackContext } from 'src/context/snack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { ContestContext } from 'src/context/social/contest';

const CreateContestModal = () => {
    const modal = useContext(ModalContext)
    const cc = useContext(ContestContext)
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
    const handleDateChange = (e: Date | null) => {
        if (e) {
            setContest({
                name: contest.name,
                desc: contest.desc,
                endDate: e
            })
        }
    }
    const handleCreate = () => {
        cc.createContest(contest.name, contest.desc, contest.endDate, snack)
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Due Date & Time"
                        value={contest.endDate}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField margin='dense' {...params} />}
                    />
                </LocalizationProvider>
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