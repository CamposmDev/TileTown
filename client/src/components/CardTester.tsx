import { Grid } from "@mui/material"
import ContestCard from "./card/ContestCard"
import FriendCard from "./card/FriendCard"

const CardTester = () => {
    let startDate1 = new Date(2022, 9, 12, 0, 0)
    let endDate1 = new Date(2022, 9, 12, 0, 0, 0,)
    console.log(startDate1)
    console.log(endDate1)
    return (
    <Grid container direction='row' spacing={1}> 
        <Grid item>
            <FriendCard
                firstName='Andrew' lastName='Ojeda'
                username='H8TER$HAD3$'
            />
        </Grid>
        <Grid item>
            <FriendCard
                firstName='Jonathan' lastName='Lemus'
                username='The Gamer'
            />
        </Grid>
        <Grid item>
            <FriendCard
                firstName='Kevin' lastName='Lemus'
                username='xKevzy'
            />
        </Grid>
        <Grid item>
            <ContestCard payload={
                {
                    contestName: 'Camposm\'s Challenge',
                    ownerName: 'Camposm',
                    startDate: startDate1,
                    endDate: endDate1,
                    contestTheme: 'Fantasy',
                    numOfParticipates: 32
                }
            }/>
        </Grid>
    </Grid>
    )
}

export default CardTester