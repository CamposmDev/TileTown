import Carousel from "react-material-ui-carousel"

const Item = () => {
    return (
        <div></div>
    )
}

const CommunityProfileScreen = () => {
    return (
        <Carousel>
            {[1,1,1,1,1,1,1,1].map((x,i) => <Item key={i}/>)}
        </Carousel>
    )
}

export default CommunityProfileScreen