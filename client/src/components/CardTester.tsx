import { Button, Grid, Stack } from "@mui/material"
import CommunitySettingsButton from "./button/CommunitySettingsButton"
import CommunityCard from "./card/CommunityCard"
import ContestCard from "./card/ContestCard"
import ForumPostCard from "./card/ForumPostCard"
import ProfileCard from "./card/ProfileCard"
import TilemapCard from "./card/TileItemCard"

const CardTester = () => {
    let startDate1 = new Date(2022, 9, 12, 0, 0)
    let endDate1 = new Date(2022, 9, 12, 0, 34)
    let publishDate = new Date(2022, 9, 28, 11, 34, 0)
    return (
    <Grid spacing={3} container>
        <Grid item>
            <CommunitySettingsButton
                title="RPGs Done Right"
                desc="We don't like streets"
                members= {[
                    {
                        firstName: 'Michael',
                        lastName: 'Campos',
                        username: 'Camposm'
                    },
                    {
                        firstName: 'Peter',
                        lastName: 'Walsh',
                        username: 'PeteyLumpkins'
                    },
                    {
                        firstName: 'Jonathan',
                        lastName: 'Lemus',
                        username: 'The Gamer'
                    },
                    {
                        firstName: 'Kevin',
                        lastName: 'Lemus',
                        username: 'xKevzy'
                    },
                    {
                        firstName: 'Tuyen',
                        lastName: 'Vo',
                        username: 'Emdoiqua'
                    },
                    {
                        firstName: 'Hector',
                        lastName: 'Lemus',
                        username: 'SomeQuickGuy'
                    }
                ]}
                visibility='Public'
            />
        </Grid>
        <Grid item>
            <TilemapCard
                preview='https://raw.githubusercontent.com/CamposmDev/CSE380-Group-Project/master/public/res/tilemaps/level5/level5_1.png'
                tilemapName='McBendorjee vs Robots Level 5-1'
                author='Camposm'
                publishDate={new Date(2022,11,5)}
                views={23923092}
                comments={39903}
                likes={293020}
                // tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380', 'mcbendorjee']}
                tags={['classroom', 'school', 'university', 'lecture hall', 'sbu', 'mckenna', 'cse380']}
            />
        </Grid>
        <Grid item>
            <ForumPostCard
                title='How do i compute?'
                author={{firstName: 'Michael', lastName: 'Campos', username: 'Camposm'}}
                publishDate={publishDate}
                desc='Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,'
                views={3485794389}
                likes={2345678}
                dislikes={309302}
                comments={342}
            />
        </Grid>
        <Grid item>
            <Stack>
                <CommunityCard 
                    commName={'RPGs Done Right'} 
                    commDesc={'We don\'t like streets'} 
                    numOfMembers={3_894_893} 
                    numOfTilemaps={367} 
                    numOfTilesets={198}                
                />
            </Stack>
        </Grid>
        <Grid item> 
            <Stack direction='column' spacing={1}>
                <ProfileCard
                    firstName='Andrew' lastName='Ojeda'
                    username='H8TER$HAD3$'
                />
                <ProfileCard
                    firstName='Jonathan' lastName='Lemus'
                    username='The Gamer'
                />
                <ProfileCard
                    firstName='Kevin' lastName='Lemus'
                    username='xKevzy'
                />
            </Stack>
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