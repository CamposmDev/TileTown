import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import { SLIDE_DOWN_TRANSITION } from '../util/Constants';
import { ModalContext } from 'src/context/modal';
import { SnackContext } from 'src/context/snack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { ContestContext } from 'src/context/social/contest';
import { AuthContext } from 'src/context/auth';

const CreateContestModal = () => {
    const auth = useContext(AuthContext)
    const modal = useContext(ModalContext)
    const cc = useContext(ContestContext)
    const snack = useContext(SnackContext)

    const handleClose = () => {
        setContest({name: '', desc: '', endDate: new Date(), type: 'tilemap'})
        modal.close()
    }
    const [contest, setContest] = useState({
        name: '',
        desc: '',
        endDate: new Date(),
        type: 'tilemap'

    })
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContest({
            name: e.target.value,
            desc: contest.desc,
            endDate: contest.endDate,
            type: contest.type
        })
    }
    const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContest({
            name: contest.name,
            desc: e.target.value,
            endDate: contest.endDate,
            type: contest.type
        })
    }
    const handleDateChange = (e: Date | null) => {
        if (e) {
            setContest({
                name: contest.name,
                desc: contest.desc,
                endDate: e,
                type: contest.type
            })
        }
    }
    const handleCreate = () => {
        /** TODO  */
        /** If the user creates a contest while they're in 
         * their user profile screen, in their contest tab it won't update once the contest is created.
         * The profile screen has to rerender itself.
         */
        cc.createContest(contest.name, contest.desc, contest.endDate, contest.type, snack)
        modal.close()
    }

    const handleTypeChange = (e: SelectChangeEvent) => {
        setContest({
            name: contest.name,
            desc: contest.desc,
            endDate: contest.endDate,
            type: e.target.value as string
        })
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
                <FormControl fullWidth margin='dense'>
                <InputLabel id="contest-type-input-label">Contest Type</InputLabel>
                    <Select
                        id="contest-type-select"
                        value={contest.type}
                        label="Contest Type"
                        onChange={handleTypeChange}
                    >
                        <MenuItem value={'tilemap'}>Tilemap</MenuItem>
                        <MenuItem value={'tileset'}>Tileset</MenuItem>
                    </Select>
                </FormControl>
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