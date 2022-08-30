import {Box, styled} from '@mui/material';
import HomeBanner from './HomeBanner';
import Navbar from './Navbar';

const PaddingBox = styled(Box)`
    padding : 18px 10px;
    // background-color: #f1f3f6;
`

const HomePage = () =>{
    return (
        <div style={{background : "#f1f3f6"}}>
        <Navbar/>
        <PaddingBox>
            <HomeBanner/>
        </PaddingBox>
        </div>
    );
}

export default HomePage;