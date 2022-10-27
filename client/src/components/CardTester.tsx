import { Grid } from "@mui/material"
import ContestCard from "./card/ContestCard"

const CardTester = () => {
    let startDate1 = new Date(2022, 9, 12, 0, 0)
    let endDate1 = new Date(2022, 9, 12, 0, 0, 0,)
    console.log(startDate1)
    console.log(endDate1)
    return (
    <Grid container direction='row'> 
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